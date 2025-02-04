// copy-button
document.addEventListener('DOMContentLoaded', () => {
  const fileSelect = document.getElementById('fileSelect');
  const copyButton = document.getElementById('copyButton');
  const statusMessage = document.getElementById('statusMessage');

  let selectedFileContent = '';

  // ファイル選択イベント
  fileSelect.addEventListener('change', async () => {
      const filePath = fileSelect.value;

      try {
          // ファイルをフェッチして内容を取得
          const response = await fetch(filePath);
          if (!response.ok) throw new Error('ファイルを読み込めませんでした');

          selectedFileContent = await response.text();
          statusMessage.textContent = '"コピーする"ボタンを押してね';
          copyButton.disabled = false;
      } catch (error) {
          statusMessage.textContent = 'エラー: ' + error.message;
          copyButton.disabled = true;
      }
  });

  // コピーするボタンイベント
  copyButton.addEventListener('click', () => {
      if (selectedFileContent) {
          navigator.clipboard.writeText(selectedFileContent)
              .then(() => {
                  statusMessage.textContent = 'キャラ設定をクリップボードにコピーしたよ';
              })
              .catch(() => {
                  statusMessage.textContent = 'コピーに失敗しちゃった。';
              });
      }
  });
});


