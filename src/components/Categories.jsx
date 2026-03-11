import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'living-room',
    name: 'Living Room',
    subtitle: 'Sofas · Chairs · Tables',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
    span: 'large',
  },
  {
    id: 'office',
    name: 'Office',
    subtitle: 'Desks · Chairs · Storage',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80',
    span: 'normal',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    subtitle: 'Beds · Wardrobes · Nightstands',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&q=80',
    span: 'normal',
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    subtitle: 'Lounge · Dining · Decor',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&q=80',
    span: 'normal',
  },
];

const Categories = () => {
  return (
    <section id="categories" className="cat-section">
      <div className="container">
        {/* Header */}
        <div className="cat-header">
          <div>
            <p className="cat-eyebrow">Collections</p>
            <h2 className="cat-title">Shop by Category</h2>
          </div>
          <Link to="/products" className="cat-view-all">
            View All <span>→</span>
          </Link>
        </div>

        {/* Bento grid */}
        <div className="cat-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className={`cat-card ${cat.span === 'large' ? 'cat-card--large' : ''}`}
            >
              <img src={cat.image} alt={cat.name} className="cat-card-img" />
              <div className="cat-card-grad" />
              <div className="cat-card-body">
                <h3 className="cat-card-name">{cat.name}</h3>
                <p className="cat-card-sub">{cat.subtitle}</p>
                <span className="cat-card-cta">Shop now →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
