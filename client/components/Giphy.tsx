// src/components/GiphyTrending.tsx
import { useQuery } from 'react-query';
import { getTrendingGifs } from '../apis/giphyApi.ts';

const GiphyTrending = () => {
  const { data: trendingGifs, error, isLoading } = useQuery('trendingGifs', async () => {
    const apiKey = "JLPu1k00txtFjXCrqZzSBuGW7mtfiJnk";
    if (!apiKey) {
      throw new Error('Giphy API key is missing.');
    }

    return await getTrendingGifs(apiKey);
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Trending GIFs</h2>
      <ul>
        {trendingGifs.map((gif) => (
          <li key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GiphyTrending;
