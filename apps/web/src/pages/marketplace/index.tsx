import { useCallback, useLayoutEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Select,
  TextInput,
  Group,
  Stack,
  Text,
  Container,
  UnstyledButton,
  Flex,
  Pagination,
  NumberInput,
  Skeleton,
} from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import { IconArrowsSort, IconSearch, IconX } from '@tabler/icons-react';

import { productApi } from 'resources/product';
import { ArrowDown } from 'public/icons';
import { accountApi } from 'resources/account';
import ProductCard from './components/ProductCard';
import { PER_PAGE, selectOptions } from './constants';

interface UsersListParams {
  page?: number;
  perPage?: number;
  searchValue?: string;
  sort?: {
    createdOn?: 'asc' | 'desc';
  };
  filter?: {
    price?: {
      from: number | string | undefined;
      to: number | string | undefined;
    };
  };
}

const Marketplace: NextPage = () => {
  const [search, setSearch] = useInputState('');
  const [sortBy, setSortBy] = useState(selectOptions[0].value);
  const [page, setPage] = useState<number>(1);
  const [fromPrice, setFromPrice] = useState<number | string | undefined>();
  const [toPrice, setToPrice] = useState<number | string | undefined>();

  const [params, setParams] = useState<UsersListParams>({});

  const [debouncedSearch] = useDebouncedValue(search, 500);
  const [debouncedFrom] = useDebouncedValue(fromPrice, 500);
  const [debouncedTo] = useDebouncedValue(toPrice, 500);

  const handleSort = useCallback((value: string) => {
    setSortBy(value);
    setParams((prev) => ({
      ...prev,
      sort: value === 'newest' ? { createdOn: 'desc' } : { createdOn: 'asc' },
    }));
  }, []);

  const handleReset = () => {
    setFromPrice('');
    setToPrice('');
  };

  const handleFromPriceChange = (value: number | string | undefined) => {
    setFromPrice(value);
  };

  const handleToPriceChange = (value: number | string | undefined) => {
    setToPrice(value);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
    setParams((prev) => ({
      ...prev, page: value,
    }));
  };

  useLayoutEffect(() => {
    setPage(1);
    setParams((prev) => ({ ...prev, page: 1, searchValue: debouncedSearch, perPage: PER_PAGE }));
  }, [debouncedSearch]);

  useLayoutEffect(() => {
    setPage(1);
    setParams((prev) => ({ ...prev,
      page: 1,
      perPage:
      PER_PAGE,
      filter: { price: {
        from: debouncedFrom || 0,
        to: debouncedTo || Infinity,
      } } }));
  }, [debouncedFrom, debouncedTo]);

  const { data, isLoading, isFetching } = productApi.useList(params);
  const { data: account } = accountApi.useGet();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Stack gap={32}>
        <Group gap={0} justify="space-between" align="start">
          <Stack gap={32} w={315} p={20} style={{ border: '1px solid #ECECEE', borderRadius: '12px', alignSelf: 'start' }}>
            <Group justify="space-between">
              <Text fw={700} fz={20}>Filters</Text>
              {(toPrice || fromPrice) && (
              <Group gap={4} style={{ cursor: 'pointer' }}>
                <Text fw={500} fz={14} c="#A3A3A3" onClick={handleReset}>Reset All</Text>
                <IconX size={16} color="#A3A3A3" />
              </Group>
              )}
            </Group>
            <Stack gap={12}>
              <Text fw={700} fz={14}>Price</Text>
              <Group gap={0} justify="space-between">
                <NumberInput
                  value={fromPrice}
                  onChange={handleFromPriceChange}
                  leftSection="From:"
                  hideControls
                  w={130}
                  fw={500}
                  min={0}
                  styles={{
                    section: { width: '56px' },
                    input: { paddingLeft: '56px', borderRadius: '8px' },
                  }}
                  suffix="$"
                />
                <NumberInput
                  value={toPrice}
                  min={0}
                  onChange={handleToPriceChange}
                  leftSection="To:"
                  hideControls
                  w={130}
                  fw={500}
                  suffix="$"
                  styles={{
                    input: { borderRadius: '8px' },
                  }}
                />
              </Group>
            </Stack>
          </Stack>
          <Stack w={1000} gap={20}>
            <TextInput
              value={search}
              onChange={setSearch}
              placeholder="Type to search"
              leftSection={<IconSearch size={16} />}
              rightSection={search ? (
                <UnstyledButton
                  component={Flex}
                  display="flex"
                  align="center"
                  onClick={() => setSearch('')}
                >
                  <IconX color="gray" />
                </UnstyledButton>
              ) : null}
              styles={{
                input: { height: '48px' },
              }}
            />

            <Skeleton visible={isLoading || isFetching}>
              <Group justify="space-between">
                <Text fw={700} fz={16}>
                  {data?.count || 0}
                  {' '}
                  results
                </Text>
                <Select
                  w={200}
                  size="md"
                  data={selectOptions}
                  value={sortBy}
                  onChange={handleSort}
                  rightSection={<ArrowDown size={16} />}
                  leftSection={<IconArrowsSort size={20} />}
                  comboboxProps={{
                    withinPortal: true,
                    transitionProps: {
                      transition: 'pop-bottom-right',
                      duration: 210,
                      timingFunction: 'ease-out',
                    },
                  }}
                  styles={{
                    input: { border: 'none', background: 'transparent', height: '21px', minHeight: '21px' },
                    wrapper: { height: '21px' },
                  }}
                />
              </Group>
            </Skeleton>

            {(isLoading || isFetching) && (
              <Group gap={20}>
                {[1, 2, 3, 4, 5, 6]
                  .map((num) => <Skeleton height={370} width={320} radius={12} key={num} />)}
              </Group>
            )}

            {data?.items.length ? (
              <Group gap={20}>
                {data.items.map((product) => (
                  <ProductCard
                    product={product}
                    isInCart={!!account?.cart.find((item) => item.product._id === product._id)}
                    key={product._id}
                  />
                ))}
              </Group>
            ) : (
              <Container p={75}>
                <Text size="xl" c="gray">
                  No results found, try to adjust your search.
                </Text>
              </Container>
            )}
          </Stack>
        </Group>

        {!!data?.items.length && (
        <Pagination
          onChange={handlePageChange}
          value={page}
          total={Math.ceil(data.count / PER_PAGE)}
          style={{ alignSelf: 'center' }}
        />
        )}
      </Stack>
    </>
  );
};

export default Marketplace;
