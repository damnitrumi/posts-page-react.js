import "./styles.css";

import { Component } from "react";

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../Components/Posts'
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos.slice(page, postsPerPage) })
    this.setState({ allPosts: postsAndPhotos })
  }
  async componentDidMount() {
    await this.loadPosts();
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  loadMorePosts = () => {
    const { posts, allPosts, page, postsPerPage } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts: posts, page: nextPage })
  }

  handleIChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }


  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
    }) : posts

    return (
      <section className="container">
        <div className="search-container">
          {searchValue && (
            <>
              <h1>Search Value: {searchValue}</h1>
            </>
          )}

          <TextInput
            onChange={this.handleIChange}
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts
            posts={filteredPosts}
          />
        )}

        {filteredPosts.length === 0 && (
          <p>Não há posts com a busca solicitada</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load More Posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
