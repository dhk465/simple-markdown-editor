new Vue({
	el: "#app",
	data: {
		id: 0,
		txt: ''
	},
	mounted() {
		this.focus();
		window.addEventListener('beforeunload', this.update);
		window.addEventListener('blur', this.update);
		window.addEventListener('resize', this.focus);

		if (window.location.pathname.length > 1) {
			this.id = window.location.pathname;
			this.load();
		} else {
			this.create();
		}
	},
	methods: {
		async create() {

			const url = `${window.location.origin}/api/`;

			try {
				let response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				});

				if (response.status == 200) {
					this.id = await response.json();
					window.history.pushState({}, null, this.id);
				} else {
					alert('Response error: ' + response.status);
				}
			
			} catch (e) {
				alert(e);
			}
		},
		async load() {

			const url = `${window.location.origin}/api/${this.id}`;

			try {
				let response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				});

				if (response.status == 200) {
					this.txt = await response.json();
				} else {
					alert('Response error: ' + response.status);
				}
			
			} catch (e) {
				alert(e);
			}
		},
		async update() {

			const url = `${window.location.origin}/api/${this.id}`;

			try {
				let response = await fetch(url, {
				  	method: 'PATCH',
				  	body: JSON.stringify({txt:this.txt}),
				  	headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
				  	}
				});

				if (response.status != 200) {
					alert('Response error: ' + response.status);
				}

			} catch (e) {
				alert(e);
			}
		},
		focus(event) {
    		this.$nextTick(() => this.$refs.textarea.focus());
  		}
	},
	computed: {
		markdown() {
			return marked(this.txt);
		},
		characters() {
			return this.txt.length;
		}
	}
});
