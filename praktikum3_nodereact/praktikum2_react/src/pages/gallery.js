import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Card from "../component/card";

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      buku: [
        {
          isbn: "301567",
          judul: "Call Me By Your Name",
          penulis: "Andre Aciman",
          penerbit: "Hachette Group Book",
          harga: "180000",
          cover: "https://drive.google.com/uc?id=1RD8O1R9EUzXgjeHr-RkwW3m27ikoqmkz",
        },
        {
          isbn: "307896",
          judul: "It Ends With Us",
          penulis: "Kami Garcia",
          penerbit: "Hachette Group Book",
          harga: "170000",
          cover: "https://drive.google.com/uc?id=1Qw7sZbJMmCoUBvhlaseo-rKLHalMqx57",
        },
        {
          isbn: "309284",
          judul: "The Fault In Our Stars",
          penulis: "John Green",
          penerbit: "Hachette Group Book",
          harga: "150000",
          cover: "https://drive.google.com/uc?id=1UKbvz_iWSRWA8B764jo8cThwIQSO_cFF",
        },
      ],

      isbn: "",
      judul: "",
      penulis: "",
      penerbit: "",
      harga: 0,
      cover: "",
      action: "",
      selectedItem: null,
      isModalOpen: false,
      search: "",
      filterBuku: [],
      user: "",
    };
    this.state.filterBuku = this.state.buku;
  }
  setUser = () => {
    if (sessionStorage.getItem("user") === null) {
      //jika tidak ada, ditambahkan data usernya
      let input = window.prompt("Enter Your Name", "");
      if (input === null || input === "") {
        this.setUser();
      } else {
        sessionStorage.setItem("user", input);
        this.setState({
          user: input,
        });
      }
    } else {
      //jika ada, tinggal ditampilkan
      let userName = sessionStorage.getItem("user");
      this.setState({
        user: userName,
      });
    }
  };
  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSave = (e) => {
    e.preventDefault();
    let tempBuku = this.state.buku;

    if (this.state.action === "insert") {
      tempBuku.push({
        isbn: this.state.isbn,
        judul: this.state.judul,
        penulis: this.state.penulis,
        penerbit: this.state.penerbit,
        harga: this.state.harga,
        cover: this.state.cover,
      });
    } else if (this.state.action === "update") {
      let index = tempBuku.indexOf(this.state.selectedItem);
      tempBuku[index].isbn = this.state.isbn;
      tempBuku[index].judul = this.state.judul;
      tempBuku[index].penulis = this.state.penulis;
      tempBuku[index].penerbit = this.state.penerbit;
      tempBuku[index].harga = this.state.harga;
      tempBuku[index].cover = this.state.cover;
    }

    this.setState({
      buku: tempBuku,
      isModalOpen: false,
    });
  };
  add = () => {
    this.setState({
      isModalOpen: true,
      isbn: "",
      judul: "",
      penulis: "",
      penerbit: "",
      harga: 0,
      cover: "",
      action: "insert",
    });
  };
  edit = (item) => {
    this.setState({
      isModalOpen: true,
      isbn: item.isbn,
      judul: item.judul,
      penulis: item.penulis,
      penerbit: item.penerbit,
      harga: item.harga,
      cover: item.cover,
      action: "update",
      selectedItem: item,
    });
  };
  drop = (item) => {
    if (window.confirm("Are you sure wanna delete this data?")) {
      let tempBuku = this.state.buku;
      let index = tempBuku.indexOf(item);

      tempBuku.splice(index, 1);
      this.setState({
        buku: tempBuku,
      });
    }
  };
  addToCart = (selectedItem) => {
    // console.log("add to cart");
    let tempCart = [];
    if (localStorage.getItem("cart") !== null) {
      tempCart = JSON.parse(localStorage.getItem("cart"));
    }

    let existItem = tempCart.find((item) => item.isbn === selectedItem.isbn);

    if (existItem) {
      window.alert("You already add this product");
    } else {
      let jumlah = window.prompt("Enter quantity", "");
      if (jumlah !== null && jumlah !== "") {
        selectedItem.jumlahBeli = jumlah;

        tempCart.push(selectedItem);

        localStorage.setItem("cart", JSON.stringify(tempCart));
      }
    }
  };
  search = (e) => {
    if (e.keyCode === 13) {
      let search = this.state.search.toLowerCase();
      let tempBuku = this.state.buku;
      let result = tempBuku.filter((item) => {
        return item.judul.toLowerCase().includes(search) || item.penulis.toLowerCase().includes(search) || item.penerbit.toLowerCase().includes(search) || item.harga.toString().includes(search);
      });

      // console.log(result)
      this.setState({
        filterBuku: result,
      });
    }
  };
  componentDidMount = () => {
    this.setUser();
  };
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Gallery</h1>
        <h5 className="text-secondary">Username : {this.state.user}</h5>
        <input type="text" name="search" className="form-control" placeholder="Data Searching" onChange={this.handleChange} onKeyUp={(e) => this.search(e)} />
        <br />
        <button className="btn btn-success" onClick={() => this.add()}>
          Add Book
        </button>
        <div className="row">
          {this.state.filterBuku.map((item, index) => (
            <Card cover={item.cover} judul={item.judul} penulis={item.penulis} penerbit={item.penerbit} harga={item.harga} onEdit={() => this.edit(item)} onDrop={() => this.drop(item)} onCart={() => this.addToCart(item)} />
          ))}
        </div>

        {/* ini Modal*/}
        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Buku</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="isbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control type="text" name="isbn" placeholder="Enter Book ISBN" value={this.state.isbn} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="judul">
                <Form.Label>Judul Buku</Form.Label>
                <Form.Control type="text" name="judul" placeholder="Enter Book Title" value={this.state.judul} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="penulis">
                <Form.Label>Penulis Buku</Form.Label>
                <Form.Control type="text" name="penulis" placeholder="Enter Book Writer" value={this.state.penulis} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="penerbit">
                <Form.Label>Penerbit Buku</Form.Label>
                <Form.Control type="text" name="penerbit" placeholder="Enter Book Publisher" value={this.state.penerbit} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="harga">
                <Form.Label>Harga Buku</Form.Label>
                <Form.Control type="number" name="harga" placeholder="Enter Book Price" value={this.state.harga} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cover">
                <Form.Label>Cover Buku</Form.Label>
                <Form.Control type="url" name="cover" placeholder="Enter Book Cover" value={this.state.cover} onChange={this.handleChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}
