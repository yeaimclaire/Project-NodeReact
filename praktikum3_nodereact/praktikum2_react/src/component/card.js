import React from "react";

export default class Card extends React.Component {
  render() {
    return (
      <div className="col-lg-6 col-sm-12 p-2">
        <div className="card">
          <div className="card-body row">
            {/* menampilkan gambar*/}
            <div className="col-5">
              <img src={this.props.cover} className="img" height="200" alt="book" />
            </div>
            <div className="col-7">
              <h5 className="text-info">{this.props.judul}</h5>
              <h6 className="text-dark">Writer : {this.props.penulis}</h6>
              <h6 className="text-dark">Publisher : {this.props.penerbit}</h6>
              <h6 className="text-danger">Price : Rp{this.props.harga},00</h6>
              {/* button untuk mengedit */}
              <button className="btn btn-sm btn-dark m-1" onClick={this.props.onEdit}>
                Edit
              </button>

              {/* button untuk menghapus */}
              <button className="btn btn-sm btn-danger m-1" onClick={this.props.onDrop}>
                Delete
              </button>

              {/* button untuk menghapus */}
              <button className="btn btn-sm btn-secondary m-1" onClick={this.props.onCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
