from http.server import HTTPServer, SimpleHTTPRequestHandler

class UTF8Handler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        ctype = super().guess_type(path)
        if 'charset' not in ctype:
            ctype += '; charset=utf-8'
        return ctype

print("Server körs på http://192.168.1.200:8080")
HTTPServer(('', 8080), UTF8Handler).serve_forever()
