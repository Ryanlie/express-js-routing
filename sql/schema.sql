CREATE TABLE TipeRuangan (
    id_tipe int PRIMARY KEY AUTO_INCREMENT,
    nama varchar(100),
    harga_per_jam int,
    kapasitas int,
    fasilitas varchar(100),
    deskripsi varchar(100)
);

CREATE TABLE Ruangan (
    id_ruangan int PRIMARY KEY AUTO_INCREMENT,
    id_tipe int,
    status varchar(100),
    nama_ruangan varchar(100),
    harga_per_jam integer,
    FOREIGN KEY (id_tipe) REFERENCES TipeRuangan(id_tipe) 
);

CREATE TABLE Pelanggan (
    id_pelanggan int PRIMARY KEY AUTO_INCREMENT,
    nama varchar(100),
    perusahaan varchar(100),
    hp varchar(100),
    email varchar(100),
    alamat varchar(100)
);

CREATE TABLE Reservasi (
    id_reservasi int PRIMARY KEY AUTO_INCREMENT,
    pelanggan int,
    ruangan int,
    tanggal date,
    jam_mulai time,
    jam_selesai time,
    total_biaya int,
    FOREIGN KEY (pelanggan) REFERENCES Pelanggan(id_pelanggan),
    FOREIGN KEY (ruangan) REFERENCES Ruangan(id_ruangan) 
);

CREATE TABLE Pembayaran (
    id_pembayaran int PRIMARY KEY AUTO_INCREMENT,
    reservasi int,
    tanggal_bayar date,
    metode varchar(100),
    jumlah int,
    status_bayar varchar(100),
    FOREIGN KEY (reservasi) REFERENCES Reservasi(id_reservasi) 
);
