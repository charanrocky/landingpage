class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEndOfWord: boolean = false;
}

export class Trie {
  root = new TrieNode();

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(prefix: string): string[] {
    const result: string[] = [];
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return result;
      node = node.children[char];
    }
    this.collect(node, prefix, result);
    return result;
  }

  collect(node: TrieNode, prefix: string, result: string[]) {
    if (node.isEndOfWord) result.push(prefix);
    for (const char in node.children) {
      this.collect(node.children[char], prefix + char, result);
    }
  }
}
