import json
import statistics
import time

import psycopg2


def get_db_connection():
    with open(r'G:\My Drive\Personal\Work\offline\Jupyter\Git\s_locator\Backend/storage/secret_postgres-aiven.json',
              'r') as f:
        connection_info = json.load(f)

    conn = psycopg2.connect(
        host=connection_info['host'],
        port=connection_info['port'],
        database=connection_info['databaseName'],
        user=connection_info['user'],
        password=connection_info['password'],
        sslmode=connection_info['sslMode'],
        sslrootcert='/Backend/storage/secret_aiven_ca.pem'
    )
    return conn


conn = get_db_connection()
query_sql = 'SELECT VERSION()'

cur = conn.cursor()
cur.execute(query_sql)

version = cur.fetchone()[0]
print(version)


def latency(num_tests=100):
    latencies = []

    for _ in range(num_tests):
        start_time = time.time()

        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT 1")
        cur.fetchone()

        cur.close()
        conn.close()

        end_time = time.time()
        latency = (end_time - start_time) * 1000  # Convert to milliseconds
        latencies.append(latency)

    avg_latency = statistics.mean(latencies)
    min_latency = min(latencies)
    max_latency = max(latencies)
    median_latency = statistics.median(latencies)
    total_time = sum(latencies)

    print(f"Number of tests: {num_tests}")
    print(f"Average latency: {avg_latency:.2f} ms")
    print(f"Minimum latency: {min_latency:.2f} ms")
    print(f"Maximum latency: {max_latency:.2f} ms")
    print(f"Median latency: {median_latency:.2f} ms")
    print(f"total time {total_time}")


latency()
