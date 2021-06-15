import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'restaurary',

    // 管理対象のステートを指定。pathsを書かない時は`modules`に書いたモジュールに含まれるステート全て。`[]`の時はどれも保存されない
    // paths: [
      // 'auth.isLoggedIn',
      // 'master.dataSelected'
    // ],

    // ストレージの種類を指定する。デフォルトではローカルストレージ
    storage: window.sessionStorage

  })(store)
}