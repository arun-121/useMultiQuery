const useMultiQuery = (queries) => {
	const initialSearchTerms = Object.keys(queries).reduce((acc, key) => {
		acc[key] = "";
		return acc;
	}, {});

	const initialPage = Object.keys(queries).reduce((acc, key) => {
		acc[key] = 1;
		return acc;
	}, {});

	const initialLimit = Object.keys(queries).reduce((acc, key) => {
		acc[key] = 10;
		return acc;
	}, {});

	const [searchTerms, setSearchTerms] = useState(initialSearchTerms);
	const [pages, setPages] = useState(initialPage);
	const [limits, setLimits] = useState(initialLimit);

	const debouncedSearchTerms = useDebounce(searchTerms, 500);

	const updateSearchTerm = (queryKey, value) => {
		setSearchTerms((prev) => ({ ...prev, [queryKey]: value }));
	};

	const updatePage = (queryKey, page) => {
		setPages((prev) => ({ ...prev, [queryKey]: page }));
	};

	const updateLimit = (queryKey, limit) => {
		setLimits((prev) => ({ ...prev, [queryKey]: limit }));
	};

	const queriesConfig = Object.keys(queries).map((key) => ({
		queryKey: [key, pages[key], limits[key], debouncedSearchTerms[key] || ""],
		queryFn: () =>
			queries[key]({
				page: pages[key],
				limit: limits[key],
				searchTerm: debouncedSearchTerms[key] || ""
			})
	}));

	const queryResults = useQueries({ queries: queriesConfig });

	return {
		searchTerms,
		updateSearchTerm,
		queryResults,
		pages,
		limits,
		updatePage,
		updateLimit
	};
};
export default useMultiQuery;
