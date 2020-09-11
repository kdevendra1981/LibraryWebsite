// class Book{
//     constructor(name,author,section){
//         this.name = name;
//         this.author = author;
//         this.section = section;
//     }
// }
console.log("Welcome to my College Library")
class Display{
    
    //to save the book entry in local storage
    saveEntry(nameVal,authorVal,sectionVal){
        let bookID = localStorage.getItem("bookID");
        let name = localStorage.getItem("name");
        let author = localStorage.getItem("author");
        let section = localStorage.getItem("section");
        let IDList =[]
        let namelist =[];
        let authorlist=[];
        let sectionlist=[];
                     
        if(name != null || author != null || section != null){
            IDList = JSON.parse(bookID)
            namelist = JSON.parse(name);
            authorlist = JSON.parse(author);
            sectionlist = JSON.parse(section);
        }
        let val = Math.max(IDList);

        (val==0)?IDList.push(101):IDList.push(val+1);
        
        namelist.push(nameVal);
        authorlist.push(authorVal);
        sectionlist.push(sectionVal);
        
        localStorage.setItem("bookID",JSON.stringify(IDList));
        localStorage.setItem("name",JSON.stringify(namelist));
        localStorage.setItem("author",JSON.stringify(authorlist));
        localStorage.setItem("section",JSON.stringify(sectionlist));
        
        
    }
    
    //add entry to page table
    addToPage(){

        console.log("entered in add to page function")
        let bookID = localStorage.getItem("bookID");
        let name = localStorage.getItem("name");
        let author = localStorage.getItem("author");
        let section = localStorage.getItem("section");
        let IDList =[]
        let namelist =[];
        let authorlist=[];
        let sectionlist=[];
        
        if(name != null || author != null || section != null || bookID !=null){
            IDList = JSON.parse(bookID)
            namelist = JSON.parse(name);
            authorlist = JSON.parse(author);
            sectionlist = JSON.parse(section);
        
            let Parent = document.getElementById('addList')
        
            namelist.forEach((element,index) => {
                let htmlTextToAdd = `
                <tr>
                <td>${IDList[index]}</td>
                <td>${element}</td>
                <td>${authorlist[index]}</td>
                <td>${sectionlist[index]}</td>
                <td><button type="button" id=${IDList[index]} onclick="deleteBook(${IDList[index]})" class="btn btn-warning">Remove</button></td>
                </tr>`
                
                Parent.innerHTML += htmlTextToAdd;
            });
       }
    }
    
    //to clear from after sumitting
    clearForm(){
        let formObj = document.getElementById('Library')
        formObj.reset();
        
    }
    
    //validate if all the entries are legal
    validateForm(bookName,bookAuthor){
        let navID = document.getElementById('myalert')
        if(bookName == ''||bookAuthor==''){
            myalert.innerHTML = `<div class="alert alert-danger" role="alert">
                                    Cann't Update! Book name/author is empty.
                                    </div>`
            setTimeout(function(){
                navID.innerHTML = ''
            },5000)
            return false;
        
        }else{
            
             myalert.innerHTML =`<div class="alert alert-success" role="alert">
                            Book Successfully Added.
                            </div>`
            setTimeout(function(){
                navID.innerHTML = ''
            },5000)
            return true;
        }
          
    }
    
    //show alert after submitting the form
    clearPageTable(){
        console.log('entered in clear page table')
        let tableObj = document.getElementById("addList")
        tableObj.innerHTML = ''
    }
}

let displayObj = new Display();
displayObj.addToPage();
let libraryForm = document.getElementById("Library");
libraryForm.addEventListener("submit",getValues);

function getValues(e){
    e.preventDefault();
    let bookName = document.getElementById('bookname').value;
    let bookAuthor = document.getElementById('author').value;
    let bookSection = document.getElementsByClassName("form-check-input")
    let section;
    for (let rbs of bookSection){
        if (rbs.checked){
            section = rbs.value;
        }
    }
    if (displayObj.validateForm(bookName,bookAuthor)){
          // let bookObj = new Book(bookName,bookAuthor,section);
        displayObj.saveEntry(bookName,bookAuthor,section);
        displayObj.clearPageTable();
        displayObj.addToPage();
   }
}

function deleteBook(myBookID){
        console.log(`index received by deleteBook function is ${typeof myBookID}`)
        let bookID = localStorage.getItem("bookID");
        let name = localStorage.getItem("name");
        let author = localStorage.getItem("author");
        let section = localStorage.getItem("section");
        
        let IDList =[];
        let namelist =[];
        let authorlist=[];
        let sectionlist=[];
        
        if(name != null || author != null || section != null){
            IDList = JSON.parse(bookID);
            namelist = JSON.parse(name);
            authorlist = JSON.parse(author);
            sectionlist = JSON.parse(section);
        }
        IDList.forEach((index)=>{
            console.log(`index in loop ${typeof index}`)
            if(index==myBookID){
                IDList.pop(index)
                namelist.pop(index);
                authorlist.pop(index);
                sectionlist.pop(index);
            }
        });
        localStorage.setItem("bookID",JSON.stringify(IDList));
        localStorage.setItem("name",JSON.stringify(namelist));
        localStorage.setItem("author",JSON.stringify(authorlist));
        localStorage.setItem("section",JSON.stringify(sectionlist));
        
        displayObj.clearPageTable();
        displayObj.addToPage();
}

