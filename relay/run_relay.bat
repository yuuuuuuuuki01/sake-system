@echo off
cd /d "C:\sake-system\sake-system\relay\"
echo %DATE% %TIME% run_relay.bat started >> C:\sake-system\sake-system\relay\bat_trace.log
set PYTHON=C:\Users\komiya\AppData\Local\Programs\Python\Python312\python.exe
%PYTHON% relay_agent.py
%PYTHON% decoder_master_diff.py
%PYTHON% decoder_headers_diff.py
%PYTHON% decoder_sales_diff.py
%PYTHON% refresh_facts.py
%PYTHON% decoder_suppliers.py
%PYTHON% decoder_special_prices.py
%PYTHON% import_csv_all.py
%PYTHON% decoder_skido.py
