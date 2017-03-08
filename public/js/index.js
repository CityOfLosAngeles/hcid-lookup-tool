$(document).ready(()=>{

    let dropZone = document.getElementById('dropzone');

    function sendDataToServer(data){
      $.ajax({
            url: '/api/parse',
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
            success: function(data){
                console.log('upload successful!');
            }
        });
    }   

    const parse = (file) => {
        Papa.parse(file, {
         
            delimiter: "",	// auto-detect
            newline: "",	// auto-detect
            header: true,
            dynamicTyping: false,
            preview: 0,
            encoding: "",
            worker: false,
            comments: false,
            step: undefined,
            complete: undefined,
            error: undefined,
            download: true,
            skipEmptyLines: false,
            chunk: undefined,
            fastMode: undefined,
            beforeFirstChunk: undefined,
            withCredentials: undefined,
     // complete call back =============================
            complete: function(results) {
                data = results.data;
                sendDataToServer(data);
             }
        });
    }

    dropZone.ondrop = (e)=>{
        e.preventDefault();
        parse(e.dataTransfer.files[0])

    }
    
    dropZone.ondragover = ()=>{
        this.className = 'dragover';
        return false;
    }

       dropZone.ondragleave = ()=>{
        this.className = 'dropzone';
        return false;
    }
})