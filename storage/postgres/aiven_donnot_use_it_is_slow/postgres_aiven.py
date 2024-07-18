import statistics
import time
import psycopg2
import json


def latency(connection_info, num_tests=100):
    latencies = []

    for _ in range(num_tests):
        print(f"starting test num: {_}")
        # conn = psycopg2.connect(**databseinfo)
        conn = psycopg2.connect(
        host=connection_info['host'],
        port=connection_info['port'],
        database=connection_info['databaseName'],
        user=connection_info['user'],
        password=connection_info['password'],
        sslmode=connection_info['sslMode'],
        sslrootcert='G:\My Drive\Personal\Work\offline\Jupyter\Git\s_locator\storage\postgres\aiven_donnot_use_it_is_slow\secret_aiven_ca.pem'
    )
        start_time = time.time()
        cur = conn.cursor()
        cur.execute("SELECT 1")
        cur.fetchone()
        cur.close()
        conn.close()

        end_time = time.time()
        diftime = (end_time - start_time) * 1000  # Convert to milliseconds
        latencies.append(diftime)

    avg_latency = statistics.mean(latencies)
    min_latency = min(latencies)
    max_latency = max(latencies)
    median_latency = statistics.median(latencies)
    total_time = sum(latencies)
    conn.close()

    print(f"Number of tests: {num_tests}")
    print(f"Average latency: {avg_latency:.2f} ms")
    print(f"Minimum latency: {min_latency:.2f} ms")
    print(f"Maximum latency: {max_latency:.2f} ms")
    print(f"Median latency: {median_latency:.2f} ms")
    print(f"Total time: {total_time:.2f} ms")




with open(r'G:\My Drive\Personal\Work\offline\Jupyter\Git\s_locator\storage\postgres\aiven_donnot_use_it_is_slow\secret_postgres-aiven.json', 'r') as f:
        connection_info = json.load(f)

latency(connection_info)