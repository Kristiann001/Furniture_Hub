import Header from '../components/Header';
import Footer from '../components/Footer';

const Help = () => {
  return (
    <div className="help-page">
      <Header />
      
      <main className="help-main">
        <div className="container">
          {/* Header section */}
          <div className="help-header text-center">
            <span className="cat-eyebrow">User Guide</span>
            <h1 className="help-title">How to Navigate Furniture Hub</h1>
            <p className="help-subtitle">
              Everything you need to know about browsing, buying, and managing the store.
            </p>
          </div>

          <div className="help-grid">
            {/* Customer Guide */}
            <div className="help-section customer-guide">
              <div className="help-section-icon">🛍️</div>
              <h2 className="help-section-title">For Customers</h2>
              
              <div className="help-card">
                <h3>1. Browsing Products</h3>
                <p>
                  Click on <strong>Collections</strong> in the navigation bar to see all our available furniture. 
                  You can use the category buttons (Living Room, Office, Bedroom, Outdoor) at the top of the products page to filter items.
                </p>
              </div>

              <div className="help-card">
                <h3>2. Viewing Details</h3>
                <p>
                  Click on any product image or title to view its full details, including dimensions, materials, and comprehensive descriptions.
                  You'll also see high-quality images of the item.
                </p>
              </div>

              <div className="help-card">
                <h3>3. Making a Purchase</h3>
                <p>
                  We handle all sales personally to ensure the best service. When you find an item you love, simply click the green 
                  <strong> "Chat on WhatsApp to Buy"</strong> button. This will open a direct chat with us via WhatsApp, automatically 
                  including the product details you are interested in.
                </p>
              </div>
              
              <div className="help-card">
                <h3>4. Getting Support</h3>
                <p>
                  Have general questions? You can use the floating WhatsApp icon in the bottom right corner of any page, 
                  or visit our <strong>Contact</strong> page to fill out an email form.
                </p>
              </div>
            </div>

            {/* Admin Guide */}
            <div className="help-section admin-guide">
              <div className="help-section-icon">🔐</div>
              <h2 className="help-section-title">For Admins/Owners</h2>
              
              <div className="help-card">
                <h3>1. Accessing the Dashboard</h3>
                <p>
                  To manage your store, click the small <strong>Lock Icon (🔒)</strong> in the top navigation bar. 
                  You will be prompted to enter your secure PIN to access the Admin Dashboard.
                </p>
              </div>

              <div className="help-card">
                <h3>2. Admin Dashboard Overview</h3>
                <p>
                  The main dashboard gives you a quick snapshot of your business: total products, total sold items, and 
                  the current status of your database connection (Firebase).
                </p>
              </div>

              <div className="help-card">
                <h3>3. Managing Inventory (CRUD)</h3>
                <p>
                  Navigate to <strong>"Products"</strong> in the admin sidebar. Here you can:
                  <br />• <strong>Create:</strong> Click "Add New Product" to list a new item.
                  <br />• <strong>Read:</strong> View your entire active inventory in a clear table format.
                  <br />• <strong>Update:</strong> Click the "Edit" (✏️) icon next to any product to change its details, price, or description.
                  <br />• <strong>Delete:</strong> Click the "Trash" (🗑️) icon to permanently remove an item.
                </p>
              </div>

              <div className="help-card">
                <h3>4. Tracking Sales</h3>
                <p>
                  When you sell an item, you can mark it as sold (using the $ icon next to a product). 
                  It will automatically be moved to the <strong>"Sold Items"</strong> tab, allowing you to keep a permanent 
                  record of your sales history while removing it from the public customer view.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
