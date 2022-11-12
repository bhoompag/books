export const filterTheBooks = (books, filterParams, setFilterCount)=>{
        let auth_count = 0;
        let sub_count =0;
        let date_count = 0; 
        let title_count = 0;
    let filtered = books.filter((book)=>{
            let author = false;
            let subject = false;
            let title =false;
            let year = false;
        if(filterParams.author){

            let auth = new RegExp(`${filterParams.author}`,'i');
            book.author_name?.forEach((ele)=>{
                if(auth.test(ele)) author = true;
            })
            if(author) auth_count+=1;
        }
        else if(filterParams.subject){
            let sub = new RegExp(`${filterParams.subject}`, 'i');
            book.subject?.forEach((ele)=>{
                if(sub.test(ele)) subject = true;
            })
            book.subject_facet?.forEach((ele)=>{
                if(sub.test(ele)) subject = true;
            })
            book.subject_key?.forEach((ele)=>{
                if(sub.test(ele)) subject = true;
            })
            if(subject) sub_count+=1;

        }
        else if(filterParams.title){
            let tit = new RegExp(`${filterParams.title}`, 'i');
            if(tit.test(book.title)){
                title=true;
                title_count+=1;
            };
        }
        else if(filterParams.published_date && filterParams.published_date.length === 4){
            let ye = new RegExp(`${filterParams.published_date}`, 'i');
            book.publish_date?.forEach((ele)=>{
                if(ye.test(ele)){
                    console.log("matched")
                    year = true
                } 
            })
            if(year) date_count+=1;
        }
        setFilterCount({author: auth_count, subject: sub_count, title: title_count, publish_date: date_count})
        return author || subject || year || title ;
    })
    console.log(filtered)
    return filtered;
}