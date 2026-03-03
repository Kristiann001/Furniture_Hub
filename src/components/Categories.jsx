import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 'living-room',
      name: 'Living Room',
      count: 'Sofas, Chairs, Tables',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
    },
    {
      id: 'office',
      name: 'Office',
      count: 'Desks, Chairs, Storage',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      count: 'Beds, Wardrobes, Nightstands',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'
    },
    {
      id: 'outdoor',
      name: 'Outdoor',
      count: 'Lounge, Dining, Decor',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800'
    }
  ];

  return (
    <section id="categories" className="categories">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find the perfect furniture for every room</p>
          </div>
          <Link to="/products" className="btn btn-outline">View All</Link>
        </div>
        
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`} 
              className={`category-card animate-fade-up animate-delay-${index}`}
            >
              <img src={category.image} alt={category.name} />
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
                <span className="category-count">{category.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
