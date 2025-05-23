from fastapi import FastAPI,Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.database import db
from fastapi.responses import JSONResponse
from fastapi import HTTPException
from typing import Optional, List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PaperData(BaseModel):
    semester : str
    department:str
    cloudUrl:str
    subjectName:str
    examType:str
    comments:str

class UploadRequest(BaseModel):
    data:PaperData

class SearchRequest(BaseModel):
    keyword:str

class PaperResponse(BaseModel):
    id:int
    semester : str
    department:str
    cloudUrl:str
    subjectName:str
    examType:str
    comments:str

@app.get('/healthz')
def home_route():
    return {"status" : "healthy"}

@app.post('/upload-paper')
def upload_paper(payload:UploadRequest):
    try :
         doc_ref,created_at = db.collection("papers").add(payload.data.dict())
         return {
             "status_code": "201",
             "doc_id":doc_ref
         }
    except Exception as e:
        print(e)
        return {
            "status_code": "400"
        }

@app.get('/papersonfilter')
def get_papers_on_filter():
    return {}

@app.post('/papersonsearch')
def get_papers_on_search(data:SearchRequest):
    print(data)
    return {"message":"Search wale papers"}

@app.get('/getallpapers')
def get_all_papers():
    try:
        papers_ref = db.collection("papers")
        docs = papers_ref.stream()

        papers = []
        for doc in docs :
            paper_data = doc.to_dict()
            paper_data["id"] = doc.id
            papers.append(paper_data)
        
        return papers
    except Exception as e :
        print(e)
        return {"Error":e}
   