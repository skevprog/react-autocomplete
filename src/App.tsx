import React, { useState, useCallback, useEffect, MouseEventHandler } from 'react'
import useFetch from './hooks/useFetch'

import { API_URL } from './utils/constants'
import { beginningMatchingRegex, debounce } from './utils'
import { PokemonApiResponse, Pokemon } from './types'

import './App.css'
import StatusLabel from './component/StatusLabel'

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
    const reg = beginningMatchingRegex(value);
    const autocompleteResults = data.results
      .filter(({ name }: Pokemon) => name.toLowerCase().match(reg))
      .map(({ name }: Pokemon) => name)
    setPokenames(autocompleteResults)
    setShowResults(true)
  }, [data])

  const handleOnResultItemClick = (e: { currentTarget: { innerText: React.SetStateAction<string> } }) => {
    setValue(e.currentTarget.innerText);
    setPokenames([]);
    setShowResults(false);
  };

  const highlightMatchingLetter = (word: string) => {
    const reg = beginningMatchingRegex(value);
    const matchingWord = value.toLocaleLowerCase().match(reg)?.[0];

    return word.split('').map((letter, index) => (
      <span
        key={`${letter}-${index}`}
        className={`${word[index] === matchingWord?.[index] ? 'matching-letter' : ''}`}
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
              key={`${name}-${index}`}
              onClick={handleOnResultItemClick}
            >
              <p className="word">{highlightMatchingLetter(name)}</p>
            </li>
          )
        })}
      </ul>
    ) : (
      <StatusLabel status="info" message="No results Found" />
    )

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a Pokemon's name"
        className="input"
        onChange={(e) => handleOnChange(e)}
        value={value}
        aria-label="Search"
      />
      {!error && showResults && renderResults()}
      {error && <StatusLabel status="error" message={error} />}
    </div>
  )
}

export default App
