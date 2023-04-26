
exports.read_block = async function _read_block(block_id, token ,subNum,num_tabs = 0,){
    const BLOCK_CHILD_URL_TMPL = "https://api.notion.com/v1/blocks/{block_id}/children"
    const headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
    }
    let done = false;
    const result_lines_arr = [];
    console.log(block_id);
    let cur_block_id = block_id;

    while (!done) {
        const block_url = BLOCK_CHILD_URL_TMPL.replace("{block_id}", cur_block_id);
        const res = await fetch(block_url, {
            method: "GET",
            headers: headers
        });
        const data = await res.json();
        for (const result of data.results) {
            const result_type = result.type;
            const result_obj = result[result_type];

            const cur_result_text_arr = [];

            if ("rich_text" in result_obj) {
                for (const rich_text of result_obj.rich_text) {
                    if ("text" in rich_text) {
                        const text = rich_text.text.content;
                        if(num_tabs>1){
                            const prefix = "\t".repeat(1);
                            cur_result_text_arr.push(prefix + text);
                        }
                        else {
                            const prefix = "\t".repeat(0);
                            cur_result_text_arr.push(prefix + text);
                        }

                    }
                }
            }

            const result_block_id = result.id;
            const has_children = result.has_children;

            if (has_children) {
                console.log("start next")
                if(num_tabs<subNum){
                    const children_text = await _read_block(result_block_id, token,subNum,num_tabs + 1);
                    cur_result_text_arr.push(children_text);
                }
            }

            const cur_result_text = cur_result_text_arr.join("\n");
            result_lines_arr.push(cur_result_text);
        }

        if (data.next_cursor === null) {
            done = true;
            break;
        } else {
            cur_block_id = data.next_cursor;
        }
    }
    const result_lines = result_lines_arr.join("\n");
    return result_lines;
}

exports.getHashFromArticle = async (article)=>{
    let articleBytes = new TextEncoder().encode(article);
// 使用SHA-256算法计算哈希值
    let hash=await crypto.subtle.digest("SHA-256", articleBytes);
    let hashString = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    return hashString;
}