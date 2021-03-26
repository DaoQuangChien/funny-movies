import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Spin } from "antd";
import { MovieItem } from "../components";
import request from "../services/request";
import { getUserData, useAuthenActions } from "../shared";

const Home = () => {
  const userData = useMemo(getUserData, []);
  const [isSignIn] = useAuthenActions();
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchDataTurn, setFetchDataTurn] = useState(0);
  const fetchDataTurnRef = useRef();
  const getMoviesList = useCallback(() => {
    setLoading(true);
    request
      .get("/movies")
      .then((res) => {
        setMoviesList(
          res.data.map((movie) => {
            const { upVotes, downVotes } = movie;
            let isVoted;

            if (userData) {
              isVoted =
                upVotes.some((user) => user._id === userData.id) ||
                downVotes.some((user) => user._id === userData.id);
            }
            return {
              ...movie,
              upVoteAmount: upVotes.length,
              downVoteAmount: downVotes.length,
              isVoted,
            };
          })
        );
      })
      .finally(() => setLoading(false));
  }, [userData]);
  console.log(isSignIn);
  useEffect(() => {
    getMoviesList();
  }, [getMoviesList, isSignIn]);
  return (
    <div className="home-container">
      <Spin spinning={loading}>
        {moviesList.map((movie) => (
          <MovieItem {...movie} key={movie._id} />
        ))}
      </Spin>
    </div>
  );
};

export default Home;
