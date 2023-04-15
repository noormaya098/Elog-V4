import useSpStore from "./GetSPList";

export const useSpList = () => {
  const { spList, fetchSpList } = useSpStore((state) => ({
    spList: state.posts,
    fetchSpList: state.fetchPosts,
    idmp: state.idmp,
    spDetail: state.spDetail,
    fetchSpDetail: state.fetchSpDetail,
  }));

  return { spList, fetchSpList };
};
