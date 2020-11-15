import React from "react"
import axios from "axios"
import { Button, List, ListItem, TextField, IconButton } from "@material-ui/core"
import { Delete, Edit, Done } from "@material-ui/icons"

import './App.css';

function App() {
  const [pokemons, setPokemons] = React.useState([])
  const [changed, setChanged] = React.useState(false)
  const [editing, setEditing] = React.useState(-1)
  const [editValue, setEditValue] = React.useState("")

  React.useEffect(() => {
    axios.get("/api/pokemons")
      .then((response) => {
        setPokemons(response.data.data)
        setChanged(false)
      });
  }, [changed])

  const addPokemon = (e) => {
    e.preventDefault()

    const max = pokemons.length ? Math.max.apply(Math, pokemons.map(p => p._id)) : 0
    const id = max + 1
    axios.post("/api/pokemons", {
      id: id,
      name: e.target.textfield.value
    }).then(() => {
      setChanged(true);
      e.target.reset()
    });
  }

  const deletePokemon = (e, id) => {
    e.preventDefault()
    axios.delete("/api/pokemons/" + id)
      .then(() => {
        setChanged(true);
      });
  }

  const updatePokemon = (e, id) => {
    e.preventDefault()

    if (id !== editing) {
      setEditing(id)
      setEditValue(e.target.textfield.value)
      setTimeout(() => e.target.textfield.focus(), 0.5)
    } else {
      axios.put("/api/pokemons/" + id, {
        name: e.target.textfield.value
      }).then(() => {
        setEditing(-1);
        setEditValue("")
        setChanged(true)
      });
    }
  }

  const nameChange = (e) => {
    setEditValue(e.target.value)
  }

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <form className="Add-Form" onSubmit={addPokemon}>
        <TextField name="textfield"
          label="Add a pokemon"
          variant="outlined"
          color="primary"
        />
        <Button type="submit" variant="outlined" color="primary">
          Add
        </Button>
      </form>
      <List>
        {pokemons.map((pokemon) => {
          const id = pokemon._id
          return (
            <ListItem index={id}>
              <form className="Pokemon-Form" onSubmit={(e) => updatePokemon(e, id)}>
                <TextField name="textfield"
                  id={"pokemon-" + id}
                  variant="outlined"
                  value={editing !== id ? pokemon.name : editValue}
                  disabled={editing !== id}
                  onChange={nameChange}
                  inputRef={React.createRef()}
                />
                <IconButton type="submit" edge="end" color="primary" aria-label="edit">
                  {editing !== id ? <Edit /> : <Done />}
                </IconButton>
              </form>
              {/* <ListItemText primary={pokemon.name} /> */}
              <IconButton onClick={(e) => deletePokemon(e, id)} edge="end" color="secondary" aria-label="delete">
                <Delete />
              </IconButton>
            </ListItem>
          )
        })}
      </List>
    </div>
  );
}

export default App;
