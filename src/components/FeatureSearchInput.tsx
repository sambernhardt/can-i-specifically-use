import { useMemo, useRef, useState } from 'react'
import Fuse from 'fuse.js';
import useDebouncedState from '../hooks/useDebouncedState';
import { useGlobalContext } from './ContextProvider';
import { Box, Button, Flex, Text } from 'theme-ui';
import { Cancel, Search } from 'iconoir-react';
import Icon from './Icon';
import TextInput from './input/TextInput';
import { useDebounce } from '../hooks/useDebounce';
import CategoryBadge from './CategoryBadge';

const FeatureInputSearch = () => {
  const {
    bcdDataAsKeys,
    bcdDataAsArray,
    setSelectedFeatureId,
  } = useGlobalContext();

  const fuse = useMemo(() => {
    const options = {
      includeScore: true,
      keys: [
        'name',
        'searchablePath',
        'category',
      ],
    }
    
    return new Fuse(bcdDataAsArray, options)
  }, [bcdDataAsKeys]);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce<string>(search, 100);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const results = fuse.search(debouncedSearch).map((result: any) => result.item).splice(0, 20);
    return results
  }, [debouncedSearch, fuse]);

  const showClearButton = search.length > 0;

  return (
    <>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <TextInput
          ref={inputRef}
          type="text"
          autoFocus
          placeholder="Search"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setShowResults(true);
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
                onClick={() => {
                  setSearch('');
                  setSelectedFeatureId('');
                  inputRef.current?.focus();
                }}
                sx={{
                  display: 'inline-flex',
                  p: 2,
                  bg: 'transparent',
                  borderRadius: '8px',
                  '&:hover': {
                    bg: 'rgba(125,125,125,0.1)'
                  },
                }}
              >
                <Icon icon={Cancel} />
              </Button>
            </Flex>
          )}
        />
        {showResults && (
          <Box
            sx={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              width: '100%',
              bg: 'backgroundSurface',
              maxHeight: '300px',
              overflow: 'scroll',
              borderRadius: '16px',
            }}
          >
            {results.length > 0 ? results.map((result: any) => (
              <div key={result.path}>
                <Button
                  onClick={() => {
                    setSelectedFeatureId(result.path);
                    setShowResults(false);
                    setSearch(result.searchablePath);
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    py: '15px',
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    gap: 1,
                    borderBottom: '1px solid',
                    borderRadius: 0,
                    borderColor: 'borderNeutral',

                    '&:hover': {
                      bg: 'backgroundHover',
                    },
                  }}
                >
                  <CategoryBadge category={result.category} size="sm" />
                  {result.parentPath && (
                    <Text
                      sx={{
                        color: 'textNeutralSecondary',
                      }}
                    >
                      {result.parentPath}
                    </Text>
                  )}
                  {result.name}
                </Button>
              </div>
            )) : (
              <Text>
                No results
              </Text>
            )}
          </Box>
        )}
      </Box>
    </>
  )
};


export default FeatureInputSearch;
