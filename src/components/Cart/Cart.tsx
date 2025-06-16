import styles from './Cart.module.css';



export const Cart: React.FC = () => {

return (
    <>
    <div className={styles.wrapper}>
<table className={styles.table}>
    <thead>
      <tr>
        <th className={styles.th}>Product</th>
        <th className={styles.th}>Price</th>
        <th className={styles.th}>Quantity</th>
        <th className={styles.th}>Total</th>
        <th className={styles.th}>Clear</th>
      </tr>
    </thead>
    <tbody id="cart-body">
      <tr>
        <td className={styles.th}>
          <img className={styles.img} src="" />
          <br/>
          <small></small>
        </td>
        <td className={styles.th}></td>
        <td className={styles.th}>
          <div>
            <button className={styles.buttonAdd} >-</button>
            <span ></span>
            <button>+</button>
          </div>
        </td>
        <td className={styles.th}></td>
        <td className={styles.th}><button className="delete-btn" >🗑️</button></td>
      </tr>
    </tbody>
  </table>

  <div className={styles.summary}>
    <div>
    <label>
      Apply Coupon:
      <input className={styles.input} type="text" placeholder="Enter coupon here..." />
      <button  className={styles.buttonApply}>Apply</button>
    </label>
    </div>
    <div className="total">Total: $<span id="total-price">44.90</span></div>

    <div>
      <button className={styles.buttonCoupon}>Proceed to Checkout</button>
      <button>Continue Shopping</button>
    </div>
  </div>

  </div>
    
  </>

)

  };
  