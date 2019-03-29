wrk.method = "POST"
wrk.body = "{\"query\": \"query{users{_id name}}\"}"
wrk.headers["Content-Type"] = "application/json"