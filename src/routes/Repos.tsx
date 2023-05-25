import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { RepoProps } from "../types/repo";
import Repo from "../components/Repo";
import BackBtn from "../components/BackBtn";

import styles from "./Repos.module.css";
import Loader from "../components/Loader";

const Repos = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState<RepoProps[] | [] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadrepos = async function (username: string) {
      setIsLoading(true);
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await res.json();
      setIsLoading(false);
      const orderedRepos = data.sort(
        (a: RepoProps, b: RepoProps) => b.stargazers_count - a.stargazers_count
      );

      setRepos(orderedRepos.slice(0, 5));
    };

    if (username) {
      loadrepos(username);
    }
  }, []);

  if (!repos && isLoading) return <Loader />;

  return (
    <div className={styles.repos}>
      <BackBtn />
      <h2>Explore repositórios do usuário: {username}</h2>
      {repos && repos.length === 0 && <p>Não há repositórios.</p>}
      {repos && repos.length > 0 && (
        <div className={styles.repos_container}>
          {repos.map((repo: RepoProps) => (
            <Repo key={repo.name} {...repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Repos;
