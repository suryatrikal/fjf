class ApiFeature{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }
    search(){
       const keyword=this.querystr.keyword ? {
        name:{
           $regex:this.querystr.keyword,
           $options:"i"
        }
         
       }:{};
    //    console.log(keyword);
       this.query=this.query.find({...keyword});
       return this;
    }
    filter(){
        // console.log('yes');
        const copykeyword={...this.querystr};
        const toRemove=["keyword","page","limit"];
        toRemove.forEach((key)=>delete copykeyword[key]);
        // filter for price and ratings are here
        let querystr=JSON.stringify(copykeyword);
        
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,(keyword)=>`$${keyword}`);
        this.query=this.query.find(JSON.parse(querystr));
        // console.log(querystr);
        return this;
    }
    pagination(pageLimit){
        const pageno=Number(this.querystr.page)||1;
        const skip=(pageno-1)*pageLimit;
        this.query=this.query.limit(pageLimit).skip(skip);
        return this;
    }
}

module.exports=ApiFeature;