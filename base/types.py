
from typing import Literal, TypedDict

class CascaderType(TypedDict):
    name: str
    field: str

class DynamicKeysType(TypedDict):
    name: str
    source: str
    type: Literal["int", "str", "float", "bool"]