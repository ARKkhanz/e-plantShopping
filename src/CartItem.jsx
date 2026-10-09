import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalCost = item =>
    parseFloat(item.cost.substring(1)) * item.quantity;

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += calculateTotalCost(item);
    });
    return total;
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = item => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = item => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = item => dispatch(removeItem(item.name));
  const handleContinueShopping = event => onContinueShopping(event);
  const handleCheckoutShopping = () => window.alert('Coming Soon!');

  return (
    <main className="cart-container">
      <h1>Your shopping cart</h1>
      <div className="cart-summary" aria-live="polite">
        <p>Total plants: <strong>{totalQuantity}</strong></p>
        <h2>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      </div>

      {cart.length === 0 && <p className="empty-cart">Your cart is empty. Find a plant you love!</p>}

      <div className="cart-items">
        {cart.map(item => (
          <article className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>Unit price: {item.cost}</p>
              <div className="quantity-controls">
                <button aria-label={`Decrease ${item.name} quantity`}
                  onClick={() => handleDecrement(item)}>−</button>
                <span aria-live="polite">{item.quantity}</span>
                <button aria-label={`Increase ${item.name} quantity`}
                  onClick={() => handleIncrement(item)}>+</button>
              </div>
              <p className="subtotal">Subtotal: ${calculateTotalCost(item).toFixed(2)}</p>
              <button className="delete-button"
                onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-actions">
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="checkout-button"
          onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </main>
  );
}

export default CartItem;
