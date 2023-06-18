
var arrSinhVien = [];

document.querySelector('#btnThemSinhVien').onclick = function () {
    //input: maSinhVien, tenSinhVien ....
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.email = document.querySelector('#email').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;

    console.log(sv);

    /*--------------Validation-------------*/
    var valid = true;
    // if (sv.maSinhVien.trim() === "") {
    //     document.getElementById('err-required-maSinhVien').innerHTML = "Mã sinh viên không được bỏ trống!"
    //     // Dừng hàm
    //     valid = false;
    // } else {
    //     document.getElementById('err-required-maSinhVien').style.display = 'none';
    // }
    
    // if (sv.tenSinhVien.trim() === "") {
    //     document.getElementById('err-required-tenSinhVien').innerHTML = "Tên sinh viên không được bỏ trống!"
    //     valid = false;
    // } else {
    //     document.getElementById('err-required-tenSinhVien').style.display = 'none';
    // }

    valid = validation.kiemTraRong(sv.maSinhVien, 'err-required-maSinhVien','Mã sinh viên') & validation.kiemTraRong(sv.tenSinhVien, 'err-required-tenSinhVien', 'Tên sinh viên') & validation.kiemTraRong(sv.email, 'err-required-email','Email') & validation.kiemTraRong(sv.soDienThoai, 'err-required-soDienThoai', 'SDT');

    valid &= validation.kiemTraKyTu(sv.tenSinhVien,'err-letter-tenSinhVien', 'Tên sinh viên' );

    valid &= validation.kiemTraEmail(sv.email, 'err-email', 'email');

    valid &= validation.kiemTraSoDienThoai(sv.soDienThoai, 'err-soDienThoai' , 'Số điện thoại');

    valid &= validation.kiemTraDoDai(sv.maSinhVien, 'err-length-maSinhVien', 'Mã sinh viên', 1,5);

    valid &= validation.kiemTraGiaTri(sv.diemToan, "err-value-diemToan", 'Điểm Toán', 1,10) & validation.kiemTraGiaTri(sv.diemLy, "err-value-diemLy", 'Điểm Lý', 1,10) & validation.kiemTraGiaTri(sv.diemHoa, "err-value-diemHoa", 'Điểm Hóa', 1,10) & validation.kiemTraGiaTri(sv.diemRenLuyen, "err-value-diemRenLuyen", 'Điểm Rèn Luyện', 1,10);

    if(!!!valid) {
        return;
    }



    // Đưa object vào mảng để quản lý
    arrSinhVien.push(sv);


    //gọi hàm để tạo ra dữ liệu html trên body
    renderSinhVien(arrSinhVien);

    //Lưu vào localstorage
    luuLocalStorage();

}

/**
 * Đây là hàm nhận vào 1 mảng các object sinh viên và trả ra chuỗi html
 * @param {*} arrSV : arrSinhVien là 1 mảng chức các object sinh viên [...]
 */


function renderSinhVien(arrSV) {
    var contentHTML = '';
    for (var index = 0; index < arrSV.length; index++) {
        var sv = arrSV[index]
        sv.tinhDiemTrungBinh = function () {
            var diemTrungBinh = ((Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa)) / 3).toFixed(2);
            return diemTrungBinh;
        }
        contentHTML += `
            <tr class="bg-secondary text-white">
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Delete</button></td>
                <td>
                    <button class="btn btn-primary" onclick="suaSinhVien('${sv.maSinhVien}')">Edit</button>
                </td>
            </tr>
        `
    }
    //console.log(contentHTML)

    document.querySelector('tbody').innerHTML = contentHTML;
}

function xoaSinhVien(maSVClick) {
    var indexDel = -1;
    for (var index = 0; index < arrSinhVien.length; index++) {
        var svTrongMang = arrSinhVien[index];
        if (svTrongMang.maSinhVien === maSVClick) {
            indexDel = index;
            break;
        }
    }

    // Gọi hàm slice trong mảng sinh viên để xóa tại vị trí cần del
    arrSinhVien.splice(indexDel, 1);
    // Gọi hàm render lại table với dữ liệu sau khi xóa
    renderSinhVien(arrSinhVien);
    luuLocalStorage();
}

// arrSinhVien = [{...},{...},{...}]
function suaSinhVien(maSVClick) {
    console.log(maSVClick);

    //Lấy ra đc object mà mình cần click vào
    var indexEdit = -1;
    for (var index = 0; index < arrSinhVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 sv
        var sv = arrSinhVien[index];
        if (sv.maSinhVien === maSVClick) {
            indexEdit = index;
            break;
        }
    }

    //INdex edit
    if (indexEdit != -1) {
        //đem dữ liệu tại dòng đó gán lên giao diện
        document.getElementById('maSinhVien').value = arrSinhVien[indexEdit].maSinhVien;
        document.getElementById('tenSinhVien').value = arrSinhVien[indexEdit].tenSinhVien;
        document.getElementById('loaiSinhVien').value = arrSinhVien[indexEdit].loauSinhVien;
        document.getElementById('diemToan').value = arrSinhVien[indexEdit].diemToan;
        document.getElementById('diemLy').value = arrSinhVien[indexEdit].diemLy;
        document.getElementById('diemHoa').value = arrSinhVien[indexEdit].diemHoa;
        document.getElementById('diemRenLuyen').value = arrSinhVien[indexEdit].diemRenLuyen;
        document.getElementById('maSinhVien').disabled = true;
    }
}

document.getElementById('btnCapNhat').onclick = function () {
    //Lấy thông tin người dùng thay đổi và update
    var svUpdate = new SinhVien();
    svUpdate.maSinhVien = document.getElementById('maSinhVien').value;
    svUpdate.tenSinhVien = document.getElementById('tenSinhVien').value;
    svUpdate.loaiSinhVien = document.getElementById('loaiSinhVien').value;
    svUpdate.diemToan = document.getElementById('diemToan').value;
    svUpdate.diemLy = document.getElementById('diemLy').value;
    svUpdate.diemHoa = document.getElementById('diemHoa').value;
    svUpdate.diemRenLuyen = document.getElementById('diemRenLuyen').value;

    console.log(svUpdate);

    // arrSinhVine = [{maSinhVien:1,...},{maSinhVien: 2...}]

    for (var index = 0; index < arrSinhVien.length; index++) {
        var svTrongMang = arrSinhVien[index];
        if (svTrongMang.maSinhVien === svUpdate.maSinhVien) {
            //Tiến hành cập nhật
            svTrongMang.tenSinhVien = svUpdate.tenSinhVien;
            svTrongMang.loaiSinhVien = svUpdate.loaiSinhVien;
            svTrongMang.diemToan = svUpdate.diemToan;
            svTrongMang.diemLy = svUpdate.diemLy;
            svTrongMang.diemHoa = svUpdate.diemHoa;
            svTrongMang.diemRenLuyen = svUpdate.diemRenLuyen;
            break;
        }
    }
    renderSinhVien(arrSinhVien);
    luuLocalStorage();
}

// Tim kiem Sinhvien
document.getElementById('btnTimKiem').onclick = function () {
    // input
    var tuKhoa = document.getElementById('txtTuKhoa').value;

    tuKhoa = tuKhoa.trim().toLowerCase();
    tuKhoa = removeVietnameseTones(tuKhoa);

    // output
    var arrKetQua = [];

    for (var index = 0; index < arrSinhVien.length; index++) {
        // Mỗi lần duyệt lấy ra 1 object sv trong mảng
        var tenSinhVien = arrSinhVien[index].tenSinhVien;
        tenSinhVien = removeVietnameseTones(tenSinhVien);
        // Lấy tên từng sv ra kiểm ta xem có từ khóa hay ko
        if (tenSinhVien.search(tuKhoa) !== -1) {
            arrKetQua.push(arrSinhVien[index]);
        }
    }
    renderSinhVien(arrKetQua);
}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        " "
    );
    return str;
}


// Viết hàm localstorage

function luuLocalStorage() {
    var stringArrSinhVien = JSON.stringify(arrSinhVien);
    console.log(stringArrSinhVien);

    //Lưu
    localStorage.setItem('arrSinhVien', stringArrSinhVien);
}

function layDuLieuStorage() {
    //Kiểm tra xem localStorage có name đó ko
    if (localStorage.getItem('arrSinhVien')) {
        var stringSinhVien = localStorage.getItem('arrSinhVien');
        arrSinhVien = JSON.parse(stringSinhVien);
        console.log(arrSinhVien);

        renderSinhVien(arrSinhVien);
    }
}
//Lấy dữ liệu từ localstorage
layDuLieuStorage();













//     var trSinhVien = document.createElement('tr');

//     var tdMaSinhVien = document.createElement('td');
//     tdMaSinhVien.innerHTML = sv.maSinhVien;
//     var tdTenSinhVien = document.createElement('td');
//     tdTenSinhVien.innerHTML = sv.tenSinhVien;
//     var tdLoaiSinhVien = document.createElement('td');
//     tdLoaiSinhVien.innerHTML = sv.loaiSinhVien;
//     var tdDiemTrungBinh = document.createElement('td');
//     tdDiemTrungBinh.innerHTML = sv.tinhDiemTrungBinh();
//     var tdDiemRenLuyen = document.createElement('td');
//     tdDiemRenLuyen.innerHTML = sv.diemRenLuyen;

//     var tdChucNang = document.createElement('td');
//     var btnXoa = document.createElement('button');
//     btnXoa.className = 'btn btn-success';
//     btnXoa.innerHTML = 'Delete';
//     btnXoa.onclick = function(){
//         // var td = btnXoa.parentElement;
//         // //var tr = td.parentElement;
//         // var tr = btnXoa.parentElement.parentElement;
//         var tr = btnXoa.closest('tr')
//         tr.remove();
//     }
//     tdChucNang.appendChild(btnXoa);



//     trSinhVien.appendChild(tdMaSinhVien);
//     trSinhVien.appendChild(tdTenSinhVien);
//     trSinhVien.appendChild(tdLoaiSinhVien);
//     trSinhVien.appendChild(tdDiemTrungBinh);
//     trSinhVien.appendChild(tdDiemRenLuyen);
//     trSinhVien.appendChild(tdChucNang);





//     document.querySelector('tbody').appendChild(trSinhVien);


//     //output: tr=>table
// }