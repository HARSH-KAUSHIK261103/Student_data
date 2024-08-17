# app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.routes.students import router as StudentRouter

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods or specify allowed methods
    allow_headers=["*"],  # Allow all headers or specify allowed headers
)

app.include_router(StudentRouter, tags=["Student"], prefix="/student")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
