export const addItemToCart = (item, next) => {
    let cart = [];
    let count=0;
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === item._id) {
          count=product.count;
          cart.splice(i, 1);
        }
      });
      cart.push({
        ...item,
        count: count+1
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };
  
  export const loadCart = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"));
      }
    }
  };
  
  export const removeItemFromCart = productId => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === productId) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  };
  
  export const cartEmpty = next => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
      let cart=[]
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  }