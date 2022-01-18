export const state = () => ({
  messages: [],
});
//stateでデータを設定します。月別での記事を検索する前は月は選ばれていないのでnullと設定しました。

export const mutations = {
  addMessage(state, payload) {
    state.messages.push(payload);
  },
};
//setSelectedDay(state, selectedDay) の第1引数で状態（state）を取得します。
//第2引数でselectedDayの値をstate（情報源）に渡します。ここでは例えばselectedDayを４月とします。
//すると、setSelectedDay(state, selectedDay) {}の中身では
//selectedDayがnullだったものを４月とデータを更新していることになります（state.selectedDay = selectedDayがそれ）。

export const actions = {
  addMessage({ commit }, payload) {
    commit("addMessage", payload);
  },
};
