from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

last_post_data = None

class Item(BaseModel):
    Sensor: bool
    Botao: bool
    LigaRobo: bool
    ResetContador: bool
    ValorContagem: int

@app.post("/analise/")
async def analisar_dados(item: Item):
    global last_post_data
    last_post_data = item.dict()
    return {"message": "Dados recebidos com sucesso"}

@app.get("/ultimo_post/")
async def get_ultimo_post():
    global last_post_data
    if last_post_data:
        return last_post_data
    else:
        raise HTTPException(status_code=404, detail="Nenhum post foi feito ainda")

# Configuração do CORS
origins = ["http://localhost:3000"]  # Altere conforme necessário para o domínio do seu front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
