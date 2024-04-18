// listeye yeni bir madde eklerken
function newElement() {
    let inputValue = document.querySelector("#task").value;
    if (inputValue === '') {
        showErrorToast("Listeye boş ekleme yapamazsınız!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputValue;
        li.addEventListener("click", toggleChecked);
        // Silme butonunu oluştur
        let closeButton = document.createElement("span");
        closeButton.textContent = "x";
        closeButton.className = "close";
        closeButton.onclick = removeElement;
        
        // Liste öğesine silme butonunu ekle
        li.appendChild(closeButton);

        document.querySelector("#list").appendChild(li); // listeye ekle
        document.querySelector("#task").value = ""; // Inputu temizle
        showSuccessToast("Listeye eklendi.");
        updateLocalStorage();
    }
}

// Listedeli elementi silerken
function removeElement() {
    let listItem = this.parentNode;
    listItem.remove();
    updateLocalStorage();
}

// yapıldıysa üstüne checked at
function toggleChecked() {
    this.classList.toggle("checked");
    updateLocalStorage();
}

// Local Storage 
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#list li").forEach(item => {
        let task = {
            content: item.textContent,
            checked: item.classList.contains("checked")
        };
        tasks.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Sayfa yüklendiğinde Local Storage'dan verileri al ve listeyi güncelle
window.onload = function() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));
    let list = document.querySelector("#list");
    if (storedTasks) {
        storedTasks.forEach(task => {
            let li = document.createElement("li");
            li.textContent = task.content;
            if (task.checked) {
                li.classList.add("checked");
            }
            li.addEventListener("click", toggleChecked);
            // Silme butonu yeni eklenen tasklar için geliyor ama localden gelenlerde olmadığı için burda da tanımlandı
            let closeButton = document.createElement("span");
            closeButton.textContent = "×";
            closeButton.className = "close";
            closeButton.onclick = removeElement;
            li.appendChild(closeButton);
            list.appendChild(li);
        });
    }
};
// Tüm sayfa load edildikten sonra gibi bir kullanım daha sonra bakmak üzere yorum satırında
// document.addEventListener("DOMContentLoaded", function() {
//     let storedTasks = JSON.parse(localStorage.getItem("tasks"));
//     let list = document.querySelector("#list");
//     if (storedTasks) {
//         storedTasks.forEach(task => {
//             let li = document.createElement("li");
//             li.textContent = task.content;
//             if (task.checked) {
//                 li.classList.add("checked");
//             }
//             li.addEventListener("click", toggleChecked);
            
//             // Silme butonunu oluştur
//             let closeButton = document.createElement("span");
//             closeButton.textContent = "×";
//             closeButton.className = "close";
//             closeButton.onclick = removeElement;
            
//             // Kullanıcı tarafından eklenen görevlerin yanında silme butonunu ekle
//             if (!task.fromLocalStorage) {
//                 // Liste öğesine silme butonunu ekle
//                 li.appendChild(closeButton);
//             }

//             list.appendChild(li);
//         });
//     }
// });
// Hata alındığında Toast
function showErrorToast(message) {
    let toast = document.querySelector(".toast.error");
    let toastBody = toast.querySelector(".toast-body");
    toastBody.textContent = message;
    $(toast).toast("show");
}

// Başarı olduğunda Toast
function showSuccessToast(message) {
    let toast = document.querySelector(".toast.success");
    let toastBody = toast.querySelector(".toast-body");
    toastBody.textContent = message;
    $(toast).toast("show");
}
