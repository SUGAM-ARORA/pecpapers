from pydantic import BaseModel

class PaperResponse(BaseModel):
    id:int
    semester : str
    department:str
    cloudUrl:str
    subjectName:str
    examType:str
    comments:str