import { useEffect, useMemo, useRef, useState } from 'react'
import Fuse from 'fuse.js';
import { useGlobalContext } from './ContextProvider';
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
  const {
    setSelectedFeatureId,
    selectedFeature,
  } = useGlobalContext();

  const fuse = useMemo(() => {
    const options = {
      includeScore: true,
      threshold: 0.3,
      keys: [
        'searchablePath',
        'category',
      ],
    }
    
    return new Fuse(bcdDataAsArray, options)
  }, [bcdDataAsKeys]);

  const [search, setSearch] = useState(selectedFeature ? selectedFeature.searchablePath : '');
  const debouncedSearch = useDebounce<string>(search, 20);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const _results = fuse.search(debouncedSearch).map((result: any) => result.item).splice(0, 15);
    return _results
  }, [debouncedSearch, fuse]);

  const shouldShowResults = search.length > 0 && showResults;

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
                  setSelectedFeatureId('');
                  inputRef.current?.focus();
                  navigate('/');
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
            sx={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              width: '100%',
              bg: 'backgroundSurface',
              zIndex: 1,
              maxHeight: '300px',
              overflow: 'scroll',
              borderRadius: '16px',
              boxShadow: 'default',
            }}
          >
            {results.length > 0 ? results.map((result: any) => (
              <div key={result.path}>
                <Button
                  onClick={() => {
                    setSelectedFeatureId(result.path);
                    setShowResults(false);
                    setSearch(result.searchablePath);

                    navigate(`/feature/${result.path.replace(/\./g, '+')}`);
                  }}
                  variant="ghost"
                  sx={{
                    color: 'textNeutralPrimary',
                    display: 'flex',
                    alignItems: 'baseline',
                    py: '15px',
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    gap: 1,
                    borderRadius: 0,
                    border: 'none',
                    borderBottom: '1px solid',
                    borderBottomColor: 'borderNeutralSecondary',
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
    </>
  )
};


export default FeatureInputSearch;
