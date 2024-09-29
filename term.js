const vscode = require('vscode');

async function countTerminals() {
  const terminals = vscode.window.terminals;
  const terminalCount = terminals.length;
  vscode.window.showInformationMessage(`Number of open terminals: ${terminalCount}`);
}

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.countTerminals', countTerminals);
  context.subscriptions.push(disposable);
}

exports.activate = activate;
