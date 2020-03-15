function TreeNode(id, parent, children) {
  this.id = id
  this.parent = parent || null
  this.children = children || []
  this.root = this.parent ? this.parent.root : this
  if (!TreeNode.prototype.addNode) {
    TreeNode.prototype.addNode = function(idArr) {
      if (!Array.isArray(idArr) || idArr.length === 0) return
      idArr = idArr.concat()
      var len = this.children.length
      for (var i = 0; i < len; i++) {
        if (this.children[i].id === idArr[0]) {
          idArr.shift()
          this.children[i].addNode(idArr)
          return
        }
      }
      var child = new TreeNode(idArr[0], this, [])
      this.children.push(child)
      idArr.shift()
      child.addNode(idArr)
    }

    TreeNode.prototype.addNodes = function(idArrs) {
      if (Array.isArray(idArrs)) {
        var _this = this
        idArrs.forEach(function(idArr) {
          _this.addNode(idArr)
        })
      }
    }

    TreeNode.prototype.find = function(idArr) {
      if (!Array.isArray(idArr) || idArr.length === 0) return null

      var i = 0,
        pos = -1
      for (; i < this.children.length; i++) {
        if (this.children[i].id === idArr[0]) {
          pos = i
        }
      }
      if (pos < 0) return null
      var c = this.children[pos]
      if (idArr.length === 1) {
        return c
      } else {
        idArr.shift()
        return c.find(idArr)
      }
    }
  }
}

new Vue({
  el: '#post-list',
  template: `
    <div class="post-list">
      <!-- 检索区 -->
      <div class="input">
        <div class="container" @click="select">
          <div  v-for="(categories, index) in visibleCategories" >
            <div class="split" :class="['split-' + index]"></div>
            <div class="categories" :class="['categories-' + index]">
              <span 
                v-for="category in categories" 
                class="category" 
                :class="{selected: selected.indexOf(category) >= 0}"
                :data-index="index"
              >
                {{category}}
              </span>
            </div>
          </div>
        </div>
        <div class="search" id="search">
          <input
            type="text"
            id="searchInput"
            name="search-input"
            autocomplete="off"
            v-model="searchStr"
          />
        </div>
      </div>
      <!-- 检索结果列表 -->
      <ul class="articles" id="aticleList">
        <li v-for="post in filteredPosts">
          <a :href="post.url">
            <span class="date">{{ post.date }}</span>
            <span class="title">{{ post.title }}</span>
          </a>
        </li>
      </ul>
    </div>
    `,
  data: {
    posts: [],
    categoryTree: new TreeNode('root', null, []),
    selected: [],
    searchStr: ''
  },
  beforeMount: function() {
    var postNodes = document
      .getElementById('post-data')
      .getElementsByTagName('span')
    var len = postNodes.length
    for (var i = 0; i < len; i++) {
      var n = postNodes[i]
      this.posts.push({
        title: n.getAttribute('data-title'),
        url: n.getAttribute('data-url'),
        date: n.getAttribute('data-date').slice(0, 10),
        categories: n
          .getAttribute('data-categories')
          .split(',')
          .concat(n.getAttribute('data-tags').split(',').filter(function(item){return item.length > 0}))
      })
    }

    this.generateCategoryTree()
  },
  computed: {
    filteredPosts: function() {
      var selected = this.selected.join('')
      var searchStr = this.searchStr.toLowerCase().trim()
      return this.posts.filter(function(post){
        return post.categories.join('').indexOf(selected) === 0 &&
        (searchStr === '' || (post.title + post.date + post.categories.join('')).toLowerCase().indexOf(searchStr) > 0)
      })
    },
    visibleCategories: function() {
      var _this = this
      var res = [[]],
        selected = this.selected
      this.categoryTree.children.forEach(function(item) {
        res[0].push(item.id)
      })
      if (selected.length > 0) {
        selected.forEach(function(category, index, arr) {
          res[index + 1] = []
          _this.categoryTree
            .find(selected.slice(0, index + 1))
            .children.forEach(function(item) {
              if (res[index + 1].indexOf(item.id) < 0) {
                res[index + 1].push(item.id)
              }
            })
        })
      }
      res = res.filter(function(item){return Array.isArray(item) && item.length > 0})
      return res
    }
  },
  methods: {
    generateCategoryTree: function() {
      let _this = this
      this.posts.forEach(function(post) {
        _this.categoryTree.addNode(post.categories)
      })
    },
    select: function(e) {
      if (e.target.tagName.toLowerCase() === 'span') {
        var index = e.target.getAttribute('data-index')
        var cat = e.target.innerHTML.trim()
        var pos = this.selected.indexOf(cat)
        if (pos >= 0) {
          this.selected.splice(pos)
        } else {
          if (index <= this.selected.length - 1) {
            this.selected.splice(index)
          }
          this.selected.push(cat)
        }
      }
    }
  }
})
