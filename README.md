# Clipkit フロントエンド API ライブラリ

## 使用例

### ログイン状態を判定する

```html
<script src="https://clipkit-js.pages.dev/dist/clipkit-1.0.min.js"></script>

<script>
  var clipkit = new Clipkit();
  clipkit.currentUser().then((user) => {
    if (user) {
      console.log('You are ' + user.screenName);
    } else {
      console.log('You are a guest.');
    }
  });
</script>
```

## リファレンス

https://clipkit-js.pages.dev/docs/
