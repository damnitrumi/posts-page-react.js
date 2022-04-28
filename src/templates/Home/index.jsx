import "./styles.css";

import { useEffect, useState, useCallback } from "react";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../Components/Posts";
import { Button } from "../../Components/Button";
import { TextInput } from "../../Components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState("");

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleIChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      })
    : posts;

  return (
    <section className="container">
      <div className="search-container">
        {searchValue && (
          <>
            <h1>Search Value: {searchValue}</h1>
          </>
        )}

        <TextInput onChange={handleIChange} searchValue={searchValue} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Não há posts com a busca solicitada</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load More Posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

// export class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 2,
//     searchValue: ''
//   };

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({ posts: postsAndPhotos.slice(page, postsPerPage) })
//     this.setState({ allPosts: postsAndPhotos })
//   }
//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   componentDidUpdate() {
//   }

//   componentWillUnmount() {
//   }

//   loadMorePosts = () => {
//     const { posts, allPosts, page, postsPerPage } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);
//     this.setState({ posts: posts, page: nextPage })
//   }

//   handleIChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value })
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;
//     const filteredPosts = searchValue ? allPosts.filter(post => {
//       return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
//     }) : posts

//     return (
//       <section className="container">
//         <div className="search-container">
//           {searchValue && (
//             <>
//               <h1>Search Value: {searchValue}</h1>
//             </>
//           )}

//           <TextInput
//             onChange={this.handleIChange}
//             searchValue={searchValue}
//           />
//         </div>

//         {filteredPosts.length > 0 && (
//           <Posts
//             posts={filteredPosts}
//           />
//         )}

//         {filteredPosts.length === 0 && (
//           <p>Não há posts com a busca solicitada</p>
//         )}

//         <div className="button-container">
//           {!searchValue && (
//             <Button
//               text="Load More Posts"
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }
