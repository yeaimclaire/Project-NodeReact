import React from "react";

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [], //local
      user: "", //session
      total: 0, //dapat dari hasil perhitungan
    };
  }
  getUser = () => {
    let userName = sessionStorage.getItem("user");
    this.setState({
      user: userName,
    });
  };
  getCart = () => {
    let tempCart = [];
    let totalHarga = 0;
    if (localStorage.getItem("cart") !== null) {
      tempCart = JSON.parse(localStorage.getItem("cart"));
    }
    tempCart.map((item) => {
      return (totalHarga += item.harga * item.jumlahBeli);
    });
    this.setState({
      cart: tempCart,
      total: totalHarga,
    });
  };
  onDrop = () => {
    if (window.confirm("Are you sure want to delete all this data?")) {
      let tempCart = [];
      if (localStorage.getItem("cart") !== null) {
        localStorage.removeItem("cart");
      }
      this.setState({
        cart: tempCart,
        total: 0,
      });
    }
  };
  componentDidMount = () => {
    this.getUser();
    this.getCart();
  };
  render() {
    return (
      <div className="container">
        <div className="card col-12 mt-2">
          <div className="card-header bg-secondary text-white">Shopping Cart</div>
          <div className="card-body">
            <h5 className="text-grey">Username : {this.state.user}</h5>
            <table className="table table-bordered">
              <thead>
                <th>Book Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </thead>
              <tbody>
                {this.state.cart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.judul}</td>
                      <td>{item.harga}</td>
                      <td>{item.jumlahBeli}</td>
                      <td>{item.harga * item.jumlahBeli}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h5 className="text-info">Total Price : {this.state.total}</h5>
            <button className="btn btn-sm btn-danger m-1" onClick={this.onDrop}>
              Delete Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}
