import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// ==================== ADMIN ROUTES ====================

// Admin signup (for initial setup)
app.post('/make-server-16edd231/admin/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: 'admin' },
      email_confirm: true, // Auto-confirm since email server not configured
    });

    if (error) {
      console.log(`Admin signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log(`Admin signup exception: ${error}`);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

// Admin login (using Supabase Auth on frontend)
app.post('/make-server-16edd231/admin/verify', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    if (user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Not an admin user' }, 403);
    }

    return c.json({ success: true, user });
  } catch (error) {
    console.log(`Admin verify exception: ${error}`);
    return c.json({ error: 'Verification failed' }, 500);
  }
});

// ==================== GIFT CARDS ROUTES ====================

// Get all gift cards
app.get('/make-server-16edd231/gift-cards', async (c) => {
  try {
    const category = c.req.query('category');
    const featured = c.req.query('featured');
    
    const allCards = await kv.getByPrefix('giftcard:');
    
    let filteredCards = allCards;
    
    if (category) {
      filteredCards = allCards.filter((card: any) => card.category === category);
    }
    
    if (featured === 'true') {
      filteredCards = allCards.filter((card: any) => card.featured === true);
    }
    
    return c.json({ giftCards: filteredCards });
  } catch (error) {
    console.log(`Error fetching gift cards: ${error}`);
    return c.json({ error: 'Failed to fetch gift cards' }, 500);
  }
});

// Get single gift card
app.get('/make-server-16edd231/gift-cards/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const card = await kv.get(`giftcard:${id}`);
    
    if (!card) {
      return c.json({ error: 'Gift card not found' }, 404);
    }
    
    return c.json({ giftCard: card });
  } catch (error) {
    console.log(`Error fetching gift card: ${error}`);
    return c.json({ error: 'Failed to fetch gift card' }, 500);
  }
});

// Create gift card (Admin only)
app.post('/make-server-16edd231/gift-cards', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const giftCard = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const cardData = {
      ...giftCard,
      id,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`giftcard:${id}`, cardData);
    
    return c.json({ success: true, giftCard: cardData });
  } catch (error) {
    console.log(`Error creating gift card: ${error}`);
    return c.json({ error: 'Failed to create gift card' }, 500);
  }
});

// Update gift card (Admin only)
app.put('/make-server-16edd231/gift-cards/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(`giftcard:${id}`);
    if (!existing) {
      return c.json({ error: 'Gift card not found' }, 404);
    }
    
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`giftcard:${id}`, updated);
    
    return c.json({ success: true, giftCard: updated });
  } catch (error) {
    console.log(`Error updating gift card: ${error}`);
    return c.json({ error: 'Failed to update gift card' }, 500);
  }
});

// Delete gift card (Admin only)
app.delete('/make-server-16edd231/gift-cards/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    await kv.del(`giftcard:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting gift card: ${error}`);
    return c.json({ error: 'Failed to delete gift card' }, 500);
  }
});

// ==================== ORDERS ROUTES ====================

// Get all orders (Admin) or user orders
app.get('/make-server-16edd231/orders', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    const allOrders = await kv.getByPrefix('order:');
    
    if (user?.user_metadata?.role === 'admin') {
      return c.json({ orders: allOrders });
    }
    
    const userEmail = c.req.query('email');
    if (userEmail) {
      const userOrders = allOrders.filter((order: any) => order.email === userEmail);
      return c.json({ orders: userOrders });
    }
    
    return c.json({ orders: [] });
  } catch (error) {
    console.log(`Error fetching orders: ${error}`);
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
});

// Create order
app.post('/make-server-16edd231/orders', async (c) => {
  try {
    const orderData = await c.req.json();
    const orderId = `ORD${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const order = {
      ...orderData,
      id: orderId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`order:${orderId}`, order);
    
    return c.json({ success: true, order });
  } catch (error) {
    console.log(`Error creating order: ${error}`);
    return c.json({ error: 'Failed to create order' }, 500);
  }
});

// Update order status (Admin only)
app.put('/make-server-16edd231/orders/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const existing = await kv.get(`order:${id}`);
    if (!existing) {
      return c.json({ error: 'Order not found' }, 404);
    }
    
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`order:${id}`, updated);
    
    return c.json({ success: true, order: updated });
  } catch (error) {
    console.log(`Error updating order: ${error}`);
    return c.json({ error: 'Failed to update order' }, 500);
  }
});

// Get single order
app.get('/make-server-16edd231/orders/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const order = await kv.get(`order:${id}`);
    
    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }
    
    return c.json({ order });
  } catch (error) {
    console.log(`Error fetching order: ${error}`);
    return c.json({ error: 'Failed to fetch order' }, 500);
  }
});

// ==================== CATEGORIES ROUTES ====================

app.get('/make-server-16edd231/categories', async (c) => {
  try {
    const categories = [
      { id: 'shopping', name: 'Shopping', icon: '🛍️' },
      { id: 'gaming', name: 'Gaming', icon: '🎮' },
      { id: 'food', name: 'Food & Dining', icon: '🍔' },
      { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
      { id: 'travel', name: 'Travel & Transport', icon: '✈️' },
      { id: 'digital', name: 'Digital Services', icon: '💳' },
    ];
    
    return c.json({ categories });
  } catch (error) {
    console.log(`Error fetching categories: ${error}`);
    return c.json({ error: 'Failed to fetch categories' }, 500);
  }
});

// ==================== COUPONS ROUTES ====================

// Get all coupons
app.get('/make-server-16edd231/coupons', async (c) => {
  try {
    const coupons = await kv.getByPrefix('coupon:');
    return c.json({ coupons });
  } catch (error) {
    console.log(`Error fetching coupons: ${error}`);
    return c.json({ error: 'Failed to fetch coupons' }, 500);
  }
});

// Validate coupon
app.post('/make-server-16edd231/coupons/validate', async (c) => {
  try {
    const { code } = await c.req.json();
    const coupon = await kv.get(`coupon:${code.toUpperCase()}`);
    
    if (!coupon) {
      return c.json({ valid: false, message: 'Invalid coupon code' });
    }
    
    if (!coupon.active) {
      return c.json({ valid: false, message: 'Coupon is inactive' });
    }
    
    const now = new Date();
    if (coupon.expiryDate && new Date(coupon.expiryDate) < now) {
      return c.json({ valid: false, message: 'Coupon has expired' });
    }
    
    return c.json({ valid: true, coupon });
  } catch (error) {
    console.log(`Error validating coupon: ${error}`);
    return c.json({ error: 'Failed to validate coupon' }, 500);
  }
});

// Create coupon (Admin only)
app.post('/make-server-16edd231/coupons', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const couponData = await c.req.json();
    const code = couponData.code.toUpperCase();
    
    await kv.set(`coupon:${code}`, {
      ...couponData,
      code,
      createdAt: new Date().toISOString(),
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error creating coupon: ${error}`);
    return c.json({ error: 'Failed to create coupon' }, 500);
  }
});

// Delete coupon (Admin only)
app.delete('/make-server-16edd231/coupons/:code', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const code = c.req.param('code');
    await kv.del(`coupon:${code}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting coupon: ${error}`);
    return c.json({ error: 'Failed to delete coupon' }, 500);
  }
});

// ==================== ADMIN DASHBOARD ROUTES ====================

app.get('/make-server-16edd231/admin/dashboard', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const orders = await kv.getByPrefix('order:');
    const giftCards = await kv.getByPrefix('giftcard:');
    
    const today = new Date().toDateString();
    const todayOrders = orders.filter((order: any) => 
      new Date(order.createdAt).toDateString() === today
    );
    
    const pendingOrders = orders.filter((order: any) => order.status === 'pending');
    
    const totalSales = orders
      .filter((order: any) => order.status === 'completed')
      .reduce((sum: number, order: any) => sum + (order.total || 0), 0);
    
    return c.json({
      totalSales,
      todayOrders: todayOrders.length,
      pendingOrders: pendingOrders.length,
      giftCardsCount: giftCards.length,
      recentOrders: orders.slice(0, 10),
    });
  } catch (error) {
    console.log(`Error fetching dashboard data: ${error}`);
    return c.json({ error: 'Failed to fetch dashboard data' }, 500);
  }
});

// ==================== PAYMENT ROUTES ====================

// Initiate payment
app.post('/make-server-16edd231/payment/initiate', async (c) => {
  try {
    const paymentData = await c.req.json();
    const txnId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    // In production, this would call PayU Biz API
    // For now, store payment initiation
    await kv.set(`payment:${txnId}`, {
      ...paymentData,
      txnId,
      status: 'initiated',
      createdAt: new Date().toISOString(),
    });
    
    return c.json({ 
      success: true, 
      txnId,
      // In production, return PayU payment URL
      message: 'Payment initiated' 
    });
  } catch (error) {
    console.log(`Error initiating payment: ${error}`);
    return c.json({ error: 'Failed to initiate payment' }, 500);
  }
});

// Verify payment
app.post('/make-server-16edd231/payment/verify', async (c) => {
  try {
    const { txnId, status } = await c.req.json();
    
    const payment = await kv.get(`payment:${txnId}`);
    if (!payment) {
      return c.json({ error: 'Payment not found' }, 404);
    }
    
    // Update payment status
    payment.status = status;
    payment.verifiedAt = new Date().toISOString();
    await kv.set(`payment:${txnId}`, payment);
    
    // Update order status if payment successful
    if (status === 'success' && payment.orderId) {
      const order = await kv.get(`order:${payment.orderId}`);
      if (order) {
        order.status = 'completed';
        order.paymentStatus = 'paid';
        order.txnId = txnId;
        
        // Generate gift card codes for the order
        order.giftCardCodes = order.items.map((item: any) => ({
          cardName: item.name,
          code: `GC${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          pin: Math.floor(1000 + Math.random() * 9000),
        }));
        
        await kv.set(`order:${payment.orderId}`, order);
      }
    }
    
    return c.json({ success: true, payment });
  } catch (error) {
    console.log(`Error verifying payment: ${error}`);
    return c.json({ error: 'Failed to verify payment' }, 500);
  }
});

// ==================== INVENTORY ROUTES ====================

// Add gift card codes to inventory (Admin only)
app.post('/make-server-16edd231/inventory/:giftCardId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const giftCardId = c.req.param('giftCardId');
    const { codes } = await c.req.json();
    
    const existing = await kv.get(`inventory:${giftCardId}`) || { codes: [] };
    existing.codes = [...existing.codes, ...codes];
    
    await kv.set(`inventory:${giftCardId}`, existing);
    
    return c.json({ success: true, totalCodes: existing.codes.length });
  } catch (error) {
    console.log(`Error adding inventory: ${error}`);
    return c.json({ error: 'Failed to add inventory' }, 500);
  }
});

// Get inventory count (Admin only)
app.get('/make-server-16edd231/inventory/:giftCardId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user || user.user_metadata?.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const giftCardId = c.req.param('giftCardId');
    const inventory = await kv.get(`inventory:${giftCardId}`) || { codes: [] };
    
    return c.json({ count: inventory.codes.length, codes: inventory.codes });
  } catch (error) {
    console.log(`Error fetching inventory: ${error}`);
    return c.json({ error: 'Failed to fetch inventory' }, 500);
  }
});

Deno.serve(app.fetch);
