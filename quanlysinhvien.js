
var arrSinhVien = [];

document.querySelector('#btnThemSinhVien').onclick = function () {
    //input: maSinhVien, tenSinhVien ....
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;

    console.log(sv);

    arrSinhVien.push(sv)


    //gọi hàm để tạo ra dữ liệu html trên body
    renderSinhVien(arrSinhVien);

}

/**
 * Đây là hàm nhận vào 1 mảng các object sinh viên và trả ra chuỗi html
 * @param {*} arrSV : arrSinhVien là 1 mảng chức các object sinh viên [...]
 */


function renderSinhVien(arrSV) {
    var contentHTML = '';
    for (var index = 0; index < arrSV.length ; index++) {
        var sv = arrSV[index]
        contentHTML += `
            <tr class="bg-secondary text-white">
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Delete</button></td>
            </tr>
        `
    }
    //console.log(contentHTML)

    document.querySelector('tbody').innerHTML = contentHTML;

}

function xoaSinhVien(maSVClick) {
    var indexDel = -1;
    for(var index = 0; index < arrSinhVien.length; index ++)
    {
        var svTrongMang = arrSinhVien[index];
        if(svTrongMang.maSinhVien === maSVClick) {
            indexDel = index;
            break;
        }
    }

    // Gọi hàm slice trong mảng sinh viên để xóa tại vị trí cần del
    arrSinhVien.splice(indexDel, 1);
    // Gọi hàn render lại table với dữ liệu sau khi xóa
    renderSinhVien(arrSinhVien);

}
1

















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