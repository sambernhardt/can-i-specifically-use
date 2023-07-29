import { useEffect, useMemo, useRef, useState } from 'react'
import Fuse from 'fuse.js';
import { Box, Button, Flex, Text } from 'theme-ui';
import { Cancel, Search } from 'iconoir-react';
import Icon from './Icon';
import TextInput from './input/TextInput';
import { useDebounce } from '../hooks/useDebounce';
import CategoryBadge from './CategoryBadge';
import { useNavigate } from "react-router-dom";
import { bcdDataAsArray, bcdDataAsKeys } from '../data';

const FeatureInputSearch = () => {
  let navigate = useNavigate();

  const fuse = useMemo(() => {
    const options = {
      includeScore: true,
      threshold: 0.5,
      findAllMatches: true,
      keys: [
        'searchablePath',
        'category',
      ],
    }
    
    return new Fuse(bcdDataAsArray, options)
  }, [bcdDataAsKeys]);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce<string>(search, 200);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const _results = fuse.search(debouncedSearch).map((result: any) => result.item).splice(0, 25);
    return _results
  }, [debouncedSearch, fuse]);

  const shouldShowResults = search.length > 0 && showResults;
  const showClearButton = search.length > 0;

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    if (shouldShowResults) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    }
  }, [resultsRef, shouldShowResults]);

  return (
    <Box
      sx={{
        position: 'relative',
        flex: 1,
      }}
    >
      <TextInput
        ref={inputRef}
        type="text"
        autoFocus
        placeholder="Search MDN"
        value={search}
        onChange={e => {
          if (e.target.value.length === 0) {
            setSearch('');
            setShowResults(false);
          } else {
            setSearch(e.target.value);
            setShowResults(true);
          }
        }}
        leadingAdornment={(
          <Flex
            sx={{
              position: 'absolute',
              pointerEvents: 'none',
              top: 0,
              left: 3,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',

              svg: {
                height: '20px',
              }
            }}
          >
            <Icon icon={Search} />
          </Flex>
        )}
        trailingAdornment={showClearButton && (
          <Flex
            sx={{
              height: '100%',
              position: 'absolute',
              p: 2,
              top: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="ghost"
              onClick={() => {
                setSearch('');
                inputRef.current?.focus();
              }}
              sx={{
                display: 'inline-flex',
                p: 2,
                borderRadius: '8px',
              }}
            >
              <Icon icon={Cancel} />
            </Button>
          </Flex>
        )}
      />
      {shouldShowResults && (
        <Box
          ref={resultsRef}
          sx={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            left: 0,
            width: (theme: any) => [`calc(100vw - ${theme.space[4] * 2}px)`, '100%'],
            bg: 'backgroundSurface',
            zIndex: 1,
            maxHeight: '300px',
            overflow: 'scroll',
            borderRadius: '12px',
            boxShadow: 'overlay',
          }}
        >
          {results.length > 0 ? results.map((result: any) => (
            <div key={result.path}>
              <Button
                onClick={() => {
                  setShowResults(false);
                  setSearch('');

                  navigate(`/feature/${result.path.replace(/\./g, '+')}`);
                }}
                variant="ghost"
                sx={{
                  display: 'flex',
                  color: 'textNeutralPrimary',
                  px: 3,
                  py: '15px',
                  width: '100%',
                  textAlign: 'left',
                  background: 'transparent',
                  gap: 1,
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: '1px solid',
                  borderBottomColor: 'borderNeutralSecondary',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  WebkitLineClamp: 1,
                }}
              >
                <Flex
                  sx={{
                    flex: 1,
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Text
                    sx={{
                      fontWeight: 500,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {result.name}
                  </Text>
                  {result.parentPath && (
                    <Text
                      as="span"
                      sx={{
                        color: 'textNeutralSecondary',
                        mr: 1,
                        fontSize: 0,
                      }}
                    >
                      {result.parentPath}
                    </Text>
                  )}
                </Flex>
                <CategoryBadge
                  category={result.category}
                  size="sm"
                  sx={{
                    flexShrink: 0,
                  }}
                />
              </Button>
            </div>
          )) : (
            <Flex
              sx={{
                p: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                sx={{
                  color: 'textNeutralSecondary',
                }}
              >
                No results
              </Text>
            </Flex>
          )}
        </Box>
      )}
    </Box>
  )
};


export default FeatureInputSearch;
