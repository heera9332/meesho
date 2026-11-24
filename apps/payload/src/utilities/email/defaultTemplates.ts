export interface DefaultTemplateSeed {
  name: string
  slug: string
  description: string
  supportedPlaceholders: string
  subject: {
    en: string
    hi: string
  }
  content: {
    en: string
    hi: string
  }
}

export const DEFAULT_EMAIL_TEMPLATES: DefaultTemplateSeed[] = [
  {
    name: 'Order Confirmation',
    slug: 'order-confirmation',
    description: 'Sent automatically to the customer once an order is placed.',
    supportedPlaceholders:
      '{{customerName}}, {{orderId}}, {{orderTotal}}, {{orderUrl}}, {{shippingAddress}}, {{companyName}}, {{siteUrl}}, {{supportEmail}}, {{currentYear}}',
    subject: {
      en: 'Order Confirmed: #{{orderId}} | {{companyName}}',
      hi: 'ऑर्डर कन्फर्म हुआ: #{{orderId}} | {{companyName}}',
    },
    content: {
      en: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Confirmation</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #e11d48, #be185d); padding: 32px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .body { padding: 32px 24px; }
    .summary-box { background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .btn { display: inline-block; background: #e11d48; color: #ffffff !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 10px; margin: 16px 0; }
    .footer { text-align: center; font-size: 12px; color: #64748b; padding: 20px; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>{{companyName}}</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Order Confirmation</p>
    </div>
    <div class="body">
      <h2>Thank you for your order, {{customerName}}!</h2>
      <p>We are excited to let you know that your order <strong>#{{orderId}}</strong> has been confirmed and is being prepared for dispatch.</p>
      
      <div class="summary-box">
        <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Order ID:</strong> #{{orderId}}</p>
        <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Total Amount:</strong> ₹{{orderTotal}}</p>
        <p style="margin: 0; font-size: 14px;"><strong>Delivery Address:</strong> {{shippingAddress}}</p>
      </div>

      <div style="text-align: center;">
        <a href="{{orderUrl}}" class="btn">View & Track Order</a>
      </div>

      <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
        If you have any questions or need to make changes, please contact us at <a href="mailto:{{supportEmail}}">{{supportEmail}}</a>.
      </p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} {{companyName}}. All rights reserved.</p>
      <p>100% Genuine Products • Free Delivery Across India</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
      hi: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ऑर्डर कन्फर्मेशन</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #e11d48, #be185d); padding: 32px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
    .body { padding: 32px 24px; }
    .summary-box { background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .btn { display: inline-block; background: #e11d48; color: #ffffff !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 10px; margin: 16px 0; }
    .footer { text-align: center; font-size: 12px; color: #64748b; padding: 20px; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>{{companyName}}</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">ऑर्डर कन्फर्मेशन</p>
    </div>
    <div class="body">
      <h2>आपके ऑर्डर के लिए धन्यवाद, {{customerName}}!</h2>
      <p>हमें यह बताते हुए खुशी हो रही है कि आपका ऑर्डर <strong>#{{orderId}}</strong> सफलतापूर्वक कन्फर्म हो चुका है और डिस्पैच के लिए तैयार किया जा रहा है।</p>
      
      <div class="summary-box">
        <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>ऑर्डर संख्या:</strong> #{{orderId}}</p>
        <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>कुल राशि:</strong> ₹{{orderTotal}}</p>
        <p style="margin: 0; font-size: 14px;"><strong>डिलीवरी पता:</strong> {{shippingAddress}}</p>
      </div>

      <div style="text-align: center;">
        <a href="{{orderUrl}}" class="btn">ऑर्डर देखें और ट्रैक करें</a>
      </div>

      <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
        यदि आपका कोई प्रश्न है, तो कृपया <a href="mailto:{{supportEmail}}">{{supportEmail}}</a> पर संपर्क करें।
      </p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} {{companyName}}। सर्वाधिकार सुरक्षित।</p>
      <p>100% असली उत्पाद • पूरे भारत में मुफ़्त डिलीवरी</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
    },
  },
  {
    name: 'Order Access Link',
    slug: 'order-access',
    description:
      'Sent when a customer requests a magic access link to view their guest order details.',
    supportedPlaceholders:
      '{{orderId}}, {{orderUrl}}, {{customerEmail}}, {{companyName}}, {{siteUrl}}, {{supportEmail}}, {{currentYear}}',
    subject: {
      en: 'Access your order #{{orderId}} | {{companyName}}',
      hi: 'अपना ऑर्डर #{{orderId}} देखें | {{companyName}}',
    },
    content: {
      en: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>View Your Order</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #e11d48; padding: 28px; text-align: center; color: #ffffff; }
    .body { padding: 32px 24px; }
    .btn { display: inline-block; background: #e11d48; color: #ffffff !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 10px; margin: 16px 0; }
    .footer { text-align: center; font-size: 12px; color: #64748b; padding: 20px; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin: 0; font-size: 22px;">{{companyName}}</h1>
    </div>
    <div class="body">
      <h2>View Order #{{orderId}}</h2>
      <p>Click the secure link below to access your order tracking and receipt details:</p>
      
      <div style="text-align: center;">
        <a href="{{orderUrl}}" class="btn">View Order Details</a>
      </div>

      <p style="font-size: 12px; color: #64748b; word-break: break-all; margin-top: 20px;">
        Or copy and paste this link in your browser:<br>
        <a href="{{orderUrl}}">{{orderUrl}}</a>
      </p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} {{companyName}}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
      hi: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>अपना ऑर्डर देखें</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #e11d48; padding: 28px; text-align: center; color: #ffffff; }
    .body { padding: 32px 24px; }
    .btn { display: inline-block; background: #e11d48; color: #ffffff !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 10px; margin: 16px 0; }
    .footer { text-align: center; font-size: 12px; color: #64748b; padding: 20px; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin: 0; font-size: 22px;">{{companyName}}</h1>
    </div>
    <div class="body">
      <h2>ऑर्डर #{{orderId}} देखें</h2>
      <p>अपने ऑर्डर की ट्रैकिंग और रसीद देखने के लिए नीचे दिए गए सुरक्षित लिंक पर क्लिक करें:</p>
      
      <div style="text-align: center;">
        <a href="{{orderUrl}}" class="btn">ऑर्डर विवरण देखें</a>
      </div>

      <p style="font-size: 12px; color: #64748b; word-break: break-all; margin-top: 20px;">
        या इस लिंक को अपने ब्राउज़र में कॉपी करके खोलें:<br>
        <a href="{{orderUrl}}">{{orderUrl}}</a>
      </p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} {{companyName}}। सर्वाधिकार सुरक्षित।</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
    },
  },
  {
    name: 'Forgot Password',
    slug: 'forgot-password',
    description: 'Sent when a user requests a password reset link.',
    supportedPlaceholders:
      '{{customerName}}, {{resetUrl}}, {{companyName}}, {{siteUrl}}, {{supportEmail}}, {{currentYear}}',
    subject: {
      en: 'Reset your password for {{companyName}}',
      hi: '{{companyName}} के लिए अपना पासवर्ड रीसेट करें',
    },
    content: {
      en: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reset Password</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #e11d48; padding: 28px; text-align: center; color: #ffffff; }
    .body { padding: 32px 24px; }
    .btn { display: inline-block; background: #e11d48; color: #ffffff !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 10px; margin: 16px 0; }
    .footer { text-align: center; font-size: 12px; color: #64748b; padding: 20px; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin: 0; font-size: 22px;">{{companyName}}</h1>
    </div>
    <div class="body">
      <h2>Password Reset Request</h2>
      <p>Hello {{customerName}},</p>
      <p>We received a request to reset your password. Click the button below to choose a new password:</p>
      
      <div style="text-align: center;">
        <a href="{{resetUrl}}" class="btn">Reset Password</a>
      </div>

      <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
        If you did not request this change, please ignore this email. Your password will remain unchanged.
      </p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} {{companyName}}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
      hi: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>पासवर्ड रीसेट करें</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #e11d48; padding: 28px; text-align: center; color: #ffffff; }
    .body { padding: 32px 24px; }
    .btn { display: inline-block; background: #e11d48; color: #ffffff !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 10px; margin: 16px 0; }
    .footer { text-align: center; font-size: 12px; color: #64748b; padding: 20px; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin: 0; font-size: 22px;">{{companyName}}</h1>
    </div>
    <div class="body">
      <h2>पासवर्ड रीसेट अनुरोध</h2>
      <p>नमस्ते {{customerName}},</p>
      <p>हमें आपका पासवर्ड रीसेट करने का अनुरोध प्राप्त हुआ है। नया पासवर्ड चुनने के लिए नीचे दिए गए बटन पर क्लिक करें:</p>
      
      <div style="text-align: center;">
        <a href="{{resetUrl}}" class="btn">पासवर्ड रीसेट करें</a>
      </div>

      <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
        यदि आपने यह अनुरोध नहीं किया था, तो कृपया इस ईमेल को अनदेखा करें। आपका पासवर्ड सुरक्षित रहेगा।
      </p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} {{companyName}}। सर्वाधिकार सुरक्षित।</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
    },
  },
  {
    name: 'Welcome New Customer',
    slug: 'welcome',
    description: 'Sent when a new customer registers on the platform.',
    supportedPlaceholders:
      '{{customerName}}, {{companyName}}, {{siteUrl}}, {{supportEmail}}, {{currentYear}}',
    subject: {
      en: 'Welcome to {{companyName}}, {{customerName}}!',
      hi: '{{companyName}} में आपका स्वागत है, {{customerName}}!',
    },
    content: {
      en: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to {{companyName}}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #e11d48, #be185d); padding: 36px 24px; text-align: center; color: #ffffff; }
    .body { padding: 32px 24px; }
    .btn { display: inline-block; background: #e11d48; color: #ffffff !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 10px; margin: 16px 0; }
    .footer { text-align: center; font-size: 12px; color: #64748b; padding: 20px; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">Welcome to {{companyName}}!</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Smart Shopping • Lowest Wholesale Prices</p>
    </div>
    <div class="body">
      <h2>Hello {{customerName}},</h2>
      <p>Thank you for joining <strong>{{companyName}}</strong>! Discover millions of trending products direct from trusted manufacturers at factory rates.</p>
      
      <div style="text-align: center;">
        <a href="{{siteUrl}}/products" class="btn">Start Shopping Now</a>
      </div>

      <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
        Enjoy Free Delivery, Cash on Delivery, and 7-day hassle-free returns on all your orders.
      </p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} {{companyName}}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
      hi: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{companyName}} में आपका स्वागत है</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #e11d48, #be185d); padding: 36px 24px; text-align: center; color: #ffffff; }
    .body { padding: 32px 24px; }
    .btn { display: inline-block; background: #e11d48; color: #ffffff !important; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 10px; margin: 16px 0; }
    .footer { text-align: center; font-size: 12px; color: #64748b; padding: 20px; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">{{companyName}} में आपका स्वागत है!</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">स्मार्ट शॉपिंग • सबसे कम थोक दरें</p>
    </div>
    <div class="body">
      <h2>नमस्ते {{customerName}},</h2>
      <p><strong>{{companyName}}</strong> परिवार से जुड़ने के लिए धन्यवाद! सीधे विश्वसनीय निर्माताओं से थोक दरों पर लाखों ट्रेंडी उत्पाद पाएं।</p>
      
      <div style="text-align: center;">
        <a href="{{siteUrl}}/products" class="btn">अभी खरीदारी शुरू करें</a>
      </div>

      <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
        अपने सभी ऑर्डर पर मुफ़्त डिलीवरी, कैश ऑन डिलीवरी और 7-दिन की आसान वापसी का आनंद लें।
      </p>
    </div>
    <div class="footer">
      <p>© {{currentYear}} {{companyName}}। सर्वाधिकार सुरक्षित।</p>
    </div>
  </div>
</body>
</html>
      `.trim(),
    },
  },
]
