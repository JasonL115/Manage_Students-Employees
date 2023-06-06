// var sinhVien = {
//     mssv: 1,
//     ngaySinh: '10/10/1990',
//     soDienThoai: '09230099',
//     hoTen: 'Alex Benjamin',
// }

// var nhanVien = {
//     msnv: 10,
//     ngaySinh: '20/09/1989'
// }

// console.log(sinhVien['hoTen']);
// console.log(sinhVien.soDienThoai);

// --------------------BT Quản Lý Sinh Viên --------------------

// document.querySelector('#btnXacNhan').onclick = function() {
//     // input
//     var sinhVien = {
//         maSinhVien:'',
//         tenSinhVien:'',
//         loaiSinhVien:'',
//         diemToan:'',
//         diemLy: '',
//         diemHoa:'',
//         diemRenLuyen:'',
//         tinhDiemTrungBinh: function () {
//             var diemTrungBinh = (Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa))/3;
//             return diemTrungBinh;
//         },

//         xepLoaiSinhVien: function () {
//             var dtb = this.tinhDiemTrungBinh();
//             var xepLoai = '';
//             if(dtb >= 5) {
//                 xepLoai = 'Good'
//             } else {
//                 xepLoai = 'Not Good'
//             }
//             return xepLoai;
//         }
//     };

//     sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
//     sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
//     sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
//     sinhVien.diemToan = document.querySelector('#diemToan').value;
//     sinhVien.diemLy = document.querySelector('#diemLy').value;
//     sinhVien.diemHoa = document.querySelector('#diemHoa').value;
//     sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;

//     console.log(sinhVien);

//     //output
//     document.querySelector('#txtTenSinhVien').innerHTML = sinhVien.tenSinhVien;
//     document.querySelector('#txtMaSinhVien').innerHTML = sinhVien.maSinhVien;
//     document.querySelector('#txtLoaiSinhVien').innerHTML = sinhVien.loaiSinhVien;
//     document.querySelector('#txtDiemTrungBinh').innerHTML = sinhVien.tinhDiemTrungBinh();
//     document.querySelector('#txtXepLoai').innerHTML = sinhVien.xepLoaiSinhVien();
// }


document.querySelector('#btnXacNhan').onclick = function() {
}

var sv1 = new SinhVien();
console.log(sv1);



