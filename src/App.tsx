import React, { useState, useCallback, useEffect, MouseEventHandler } from 'react'
import useFetch from './hooks/useFetch'

import { API_URL } from './utils/constants'
import { debounce } from './utils'
import { PokemonApiResponse, Pokemon } from './types'

import './App.css'

function App() {

  const [value, setValue] = useState<string>('')
  const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>('')
  const [pokeNames, setPokenames] = useState<string[]>([])
  const [showResults, setShowResults] = useState<boolean>(false)

  const debouncedFn = useCallback(
    debounce((v: string) => setDebounceSearchTerm(v)),
    [],
  )

  // Query parameter doesn't exist on pokemonApi but I added it to
  // simulate a 'get' suggestions petition
  const { error, data } = useFetch<PokemonApiResponse>(
    debounceSearchTerm ? `${API_URL}?query=${debounceSearchTerm}` : '',
  )

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value.trim();
    if (inputValue.length === 0) {
      setPokenames([])
      setShowResults(false)
    }
    setValue(inputValue)
    debouncedFn(inputValue);
  }

  useEffect(() => {
    if (error || !value || !data || data?.results?.length === 0) return;
    const reg = new RegExp(`^${value.toLowerCase()}.*$`, 'g');
    const autocompleteResults = data.results
      .filter(({ name }: Pokemon) => name.toLowerCase().match(reg))
      .map(({ name }: Pokemon) => name)
    setPokenames(autocompleteResults)
    setShowResults(true)
  }, [data])

  const handleOnResultItemClick = (e: {currentTarget: { innerText: React.SetStateAction<string> }}) => {
    setValue(e.currentTarget.innerText);
    setPokenames([]);
    setShowResults(false);
  };

  const highlightMatchingLetter = (word: string) => {
    const reg = new RegExp(`^${value.toLowerCase()}.*$`, 'g');
    const matchingWord = value.toLocaleLowerCase().match(reg)?.[0];

    return word.split('').map((letter, index) => (
      <span
        key={`${letter}-${index}`}
        className={`${matchingWord && word[index] === matchingWord[index] ? 'matching-letter' : ''}`}
      >
        {letter}
      </span>
    )
    )
  }

  const renderResults = () =>
    pokeNames.length > 0 ? (
      <ul className='list'>
        {pokeNames.map((name, index) => {
          return (
            <li
              className="active"
              key={`${name}-${index}`}
              onClick={handleOnResultItemClick}
            >
              {highlightMatchingLetter(name)}
            </li>
          )
        })}
      </ul>
    ) : (
      <p className="empty">No results Found</p>
    )

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a Pokemon's name"
        className="input"
        onChange={(e) => handleOnChange(e)}
        value={value}
      />
      {!error && showResults && renderResults()}
      {error && error}
    </div>
  )
}

export default App
